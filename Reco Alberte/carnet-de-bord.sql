-- =========================================================================
-- Carnet de bord du Réseau : base partagée (Supabase), missions 3 à 5
-- À coller une seule fois dans Supabase › SQL Editor › New query › Run.
--
-- Ce que ça crée :
--   • entrees         : tout ce que les classes écrivent (lisible par tous)
--   • classes_codes   : le code secret de chaque classe (illisible depuis le site)
--   • codes_enseignant: le code qui permet d'ouvrir les missions (illisible aussi)
-- Règles :
--   • tout le monde peut LIRE les entrées non masquées ;
--   • on ne peut ÉCRIRE qu'avec le bon code de classe ;
--   • seul le code enseignant ouvre une mission (3, 4 ou 5) pour une classe ;
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

create table public.codes_enseignant (code text primary key);
alter table public.codes_enseignant enable row level security;
revoke all on public.codes_enseignant from anon, authenticated;
insert into public.codes_enseignant values (upper(substr(md5(random()::text), 1, 8)));

create table public.entrees (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  classe       text not null,
  type         text not null check (type in ('fuite','pensee','projet','kit','action','aide','final','avis','mot','ouverture')),
  destinataire text,
  agent        text check (agent ~ '^[[:alpha:]]{2,20}-[0-9]{2}$'),
  jour         text check (jour in ('LUN','MAR','MER','JEU','VEN','SAM','DIM')),
  donnees      text[] check (donnees <@ array['identite','photo','position','age','voix','contacts','gouts','ecole','motdepasse','autre']),
  lieu         text check (lieu in ('reseau','jeu','messagerie','video','site','appli','objet','autre')),
  necessaire   text check (necessaire in ('oui','non','nsp')),
  danger       smallint check (danger between 1 and 3),
  texte        text check (char_length(texte) <= 1200),
  titre        text check (char_length(titre) <= 80),
  lien         text check (char_length(lien) <= 300 and lien ~ '^https://[^[:space:]]{3,}$'),
  themes       text[] check (themes <@ array['motdepasse','geoloc','reseaux','photos','applis','pub','arnaques','traces','autre']),
  format       text check (format in ('affiche','video','podcast','jeu','bd','guide','expose','site','autre')),
  public       text check (public in ('classe','ecole','jeunes','parents','tous')),
  mission      smallint check (mission between 3 and 5),
  code         text,
  masque       boolean not null default false,
  check (type not in ('mot','avis') or (destinataire is not null and destinataire <> classe)),
  check (type <> 'ouverture' or mission is not null),
  check (type <> 'final' or titre is not null),
  check (type <> 'kit' or (themes is not null and cardinality(themes) > 0)),
  check (type in ('kit','final') or char_length(coalesce(texte, '')) <= 400),
  check (type <> 'fuite' or (donnees is not null and cardinality(donnees) > 0)),
  check (type in ('fuite','ouverture') or char_length(coalesce(texte, '')) >= 3),
  check (texte is null or (
        texte !~* '[^[:space:]@]+@[^[:space:]@]+\.[a-z]{2,}'
    and texte !~  '@[A-Za-z0-9_.]{2,}'
    and texte !~  '[0-9]([ ./-]?[0-9]){5,}'
    and texte !~* '(https?://|www\.)'
    and texte !~* '[0-9]{1,4} *(bis|ter)? *,? *(rue|avenue|av\.|bd|boulevard|chemin|allée|allee|impasse|place|cours|quai)'
  )),
  check (titre is null or (
        titre !~* '[^[:space:]@]+@[^[:space:]@]+\.[a-z]{2,}'
    and titre !~  '@[A-Za-z0-9_.]{2,}'
    and titre !~  '[0-9]([ ./-]?[0-9]){5,}'
    and titre !~* '(https?://|www\.)'
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
create function prive.prof_valide(k text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.codes_enseignant where code = upper(coalesce(k, '')));
$$;
create function prive.classe_existe(c text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.classes_codes where classe = c);
$$;
grant usage on schema prive to anon;
grant execute on function prive.code_valide(text, text), prive.classe_existe(text), prive.prof_valide(text) to anon;

alter table public.entrees enable row level security;
create policy "lire le carnet" on public.entrees for select to anon
  using (masque = false);
create policy "écrire avec le code de sa classe" on public.entrees for insert to anon
  with check (masque = false and (
        (type <> 'ouverture'
          and prive.code_valide(classe, code)
          and (destinataire is null or prive.classe_existe(destinataire)))
     or (type = 'ouverture'
          and prive.prof_valide(code)
          and prive.classe_existe(classe))));

-- Le site ne voit jamais la colonne « code » et ne peut rien modifier.
revoke all on public.entrees from anon, authenticated;
grant select (id, created_at, classe, type, destinataire, agent, jour, donnees, lieu, necessaire, danger, texte, titre, lien, themes, format, public, mission)
  on public.entrees to anon;
grant insert (classe, type, destinataire, agent, jour, donnees, lieu, necessaire, danger, texte, titre, lien, themes, format, public, mission, code)
  on public.entrees to anon;

-- Les codes : un par classe à distribuer, et le code enseignant (pour vous seul).
select classe, code from public.classes_codes
union all select 'ENSEIGNANT', code from public.codes_enseignant
order by 1;
