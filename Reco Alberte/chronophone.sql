-- =========================================================================
-- Chronophone : avis des élèves et parties sauvegardées (Supabase)
-- Peut être collé dans le même projet Supabase que le carnet de bord,
-- avant ou après carnet-de-bord.sql : SQL Editor › New query › Run.
--
-- Ce que ça crée :
--   • chrono_commentaires : les « pourquoi ? » partagés sous chaque photo
--   • chrono_parties      : les parties sauvegardées avec nom + mot de passe
-- Règles :
--   • tout le monde peut LIRE les avis non masqués et en AJOUTER ;
--   • personne ne peut modifier ni effacer depuis le site : la modération se
--     fait dans Table Editor › chrono_commentaires (cocher « masque ») ;
--   • la base refuse les textes qui ressemblent à une vraie donnée
--     (e-mail, @pseudo, numéro ou date complète, lien, adresse postale) ;
--   • les parties ne se lisent qu'avec leur clé, calculée dans le navigateur
--     à partir du nom et du mot de passe (le mot de passe n'est jamais envoyé).
-- =========================================================================

create table public.chrono_commentaires (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  jeu        text not null check (jeu ~ '^[A-Za-z0-9_-]{1,40}$'),
  photo      smallint not null check (photo between 1 and 60),
  choix      text check (choix in ('haut','bas','A','B','C','D')),
  agent      text check (agent ~ '^[[:alpha:]]{2,20}-[0-9]{2}$'),
  texte      text not null check (char_length(texte) between 3 and 300),
  masque     boolean not null default false,
  check (
        texte !~* '[^[:space:]@]+@[^[:space:]@]+\.[a-z]{2,}'
    and texte !~  '@[A-Za-z0-9_.]{2,}'
    and texte !~  '[0-9]([ ./-]?[0-9]){5,}'
    and texte !~* '(https?://|www\.)'
    and texte !~* '[0-9]{1,4} *(bis|ter)? *,? *(rue|avenue|av\.|bd|boulevard|chemin|allée|allee|impasse|place|cours|quai)'
  )
);
create index on public.chrono_commentaires (jeu, photo, created_at);

alter table public.chrono_commentaires enable row level security;
create policy "lire les avis" on public.chrono_commentaires for select to anon
  using (masque = false);
create policy "donner son avis" on public.chrono_commentaires for insert to anon
  with check (masque = false);

revoke all on public.chrono_commentaires from anon, authenticated;
grant select (id, created_at, jeu, photo, choix, agent, texte) on public.chrono_commentaires to anon;
grant insert (jeu, photo, choix, agent, texte) on public.chrono_commentaires to anon;

-- Parties sauvegardées : aucune lecture directe depuis le site.
create table public.chrono_parties (
  cle        text primary key check (cle ~ '^[0-9a-f]{64}$'),
  jeu        text not null check (jeu ~ '^[A-Za-z0-9_-]{1,40}$'),
  etat       jsonb not null check (octet_length(etat::text) <= 40000),
  updated_at timestamptz not null default now()
);
alter table public.chrono_parties enable row level security;  -- aucune règle : illisible depuis le site
revoke all on public.chrono_parties from anon, authenticated;

-- Les deux seules portes ouvertes au site (appelées par /rpc/…).
create function public.chrono_sauver(p_cle text, p_jeu text, p_etat jsonb) returns void
language sql security definer set search_path = public as $$
  insert into public.chrono_parties (cle, jeu, etat, updated_at)
  values (p_cle, p_jeu, p_etat, now())
  on conflict (cle) do update set jeu = excluded.jeu, etat = excluded.etat, updated_at = now();
$$;
create function public.chrono_charger(p_cle text) returns jsonb
language sql stable security definer set search_path = public as $$
  select etat from public.chrono_parties where cle = p_cle;
$$;
revoke all on function public.chrono_sauver(text, text, jsonb), public.chrono_charger(text) from public;
grant execute on function public.chrono_sauver(text, text, jsonb), public.chrono_charger(text) to anon;
