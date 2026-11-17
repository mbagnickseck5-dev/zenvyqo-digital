-- Zenvyqo Digital : table des prospects et des demandes.
-- À exécuter une fois dans Supabase > SQL Editor.

create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  source             text not null check (source in ('plan', 'contact')),
  status             text not null default 'new'
                     check (status in ('new', 'contacted', 'qualified', 'paid', 'won', 'lost')),
  locale             text not null default 'fr',
  plan               text check (plan in ('business-pro', 'business-plus', 'boutique-pro')),
  full_name          text not null,
  company            text,
  email              text not null,
  phone              text,
  city               text,
  province           text,
  sector             text,
  description        text not null,
  wants_call         boolean not null default false,
  consent_at         timestamptz not null default now(),
  stripe_session_id  text,
  stripe_customer_id text,
  notes              text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- RLS activé sans aucune politique : la table est invisible pour les clés
-- publiques. Seul le serveur du site (clé service_role) peut lire et écrire.
alter table public.leads enable row level security;
