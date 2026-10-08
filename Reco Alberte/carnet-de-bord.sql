-- =========================================================================
-- Carnet de bord du Réseau : base partagée (Supabase)
-- À coller une seule fois dans Supabase › SQL Editor › New query › Run.
--
-- Ce que ça crée :
--   • entrees         : tout ce que les classes écrivent (lisible par tous)
--   • classes_codes   : le code secret de chaque classe (illisible depuis le site)
-- Règles :
--   • tout le monde peut LIRE les entrées non masquées ;
--   • on ne peut ÉCRIRE qu'avec le bon code de classe ;
--   • personne ne peut modifier ni effacer depuis le site : la modération se
--     fait dans Table Editor › entrees (cocher « masque » ou supprimer la ligne) ;
--   • la base refuse les textes qui ressemblent à une vraie donnée
--     (e-mail, @pseudo, numéro ou date complète, lien, adresse postale).
-- =========================================================================

create schema if not exists prive;

create table public.classes_codes (
  classe text primary key,
  code   text not null
);
alter table public.classes_codes enable row level security;  -- aucune règle : personne ne la lit depuis le site
revoke all on public.classes_codes from anon, authenticated;

-- Les identifiants doivent être ceux de CLASSES dans carnet-de-bord.html.
-- Un code de 6 caractères est tiré au hasard pour chaque classe.
insert into public.classes_codes (classe, code)
select c, upper(substr(md5(random()::text), 1, 6))
from unnest(array['jouhaux-a','jouhaux-b','jouhaux-c','berthelot','grattetciel','rousseau']) as c;

create table public.entrees (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  classe       text not null,
  type         text not null check (type in ('fuite','pensee','action','projet','mot')),
  destinataire text,
  agent        text check (agent ~ '^[[:alpha:]]{2,20}-[0-9]{2}$'),
  jour         text check (jour in ('LUN','MAR','MER','JEU','VEN','SAM','DIM')),
  donnees      text[] check (donnees <@ array['identite','photo','position','age','voix','contacts','gouts','ecole','motdepasse','autre']),
  lieu         text check (lieu in ('reseau','jeu','messagerie','video','site','appli','objet','autre')),
  necessaire   text check (necessaire in ('oui','non','nsp')),
  danger       smallint check (danger between 1 and 3),
  texte        text check (char_length(texte) <= 400),
  code         text,
  masque       boolean not null default false,
  check (type <> 'mot' or (destinataire is not null and destinataire <> classe)),
  check (type <> 'fuite' or (donnees is not null and cardinality(donnees) > 0)),
  check (type = 'fuite' or char_length(coalesce(texte, '')) >= 3),
  check (texte is null or (
        texte !~* '[^[:space:]@]+@[^[:space:]@]+\.[a-z]{2,}'
    and texte !~  '@[A-Za-z0-9_.]{2,}'
    and texte !~  '[0-9]([ ./-]?[0-9]){5,}'
    and texte !~* '(https?://|www\.)'
    and texte !~* '[0-9]{1,4} *(bis|ter)? *,? *(rue|avenue|av\.|bd|boulevard|chemin|allée|allee|impasse|place|cours|quai)'
  ))
);
create index on public.entrees (created_at);

-- Vérifications appelées par les règles d'écriture. Elles vivent dans le
-- schéma « prive », que l'API du site n'expose pas : impossible de les
-- appeler directement pour deviner un code.
create function prive.code_valide(c text, k text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.classes_codes where classe = c and upper(code) = upper(coalesce(k, '')));
$$;
create function prive.classe_existe(c text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.classes_codes where classe = c);
$$;
grant usage on schema prive to anon;
grant execute on function prive.code_valide(text, text), prive.classe_existe(text) to anon;

alter table public.entrees enable row level security;
create policy "lire le carnet" on public.entrees for select to anon
  using (masque = false);
create policy "écrire avec le code de sa classe" on public.entrees for insert to anon
  with check (masque = false
          and prive.code_valide(classe, code)
          and (destinataire is null or prive.classe_existe(destinataire)));

-- Le site ne voit jamais la colonne « code » et ne peut rien modifier.
revoke all on public.entrees from anon, authenticated;
grant select (id, created_at, classe, type, destinataire, agent, jour, donnees, lieu, necessaire, danger, texte)
  on public.entrees to anon;
grant insert (classe, type, destinataire, agent, jour, donnees, lieu, necessaire, danger, texte, code)
  on public.entrees to anon;

-- Pour lire les codes à distribuer aux classes :
select classe, code from public.classes_codes order by classe;
