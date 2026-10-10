-- SoundWaves: accounts, identities, sessions.
--
-- No password exists, so none can leak. An account is reached through an
-- identity (a provider and the subject it names); the "dev" provider is the
-- development sign-in, the OIDC providers come later.

create table if not exists account (
    id         bigserial   primary key,
    name       text        not null unique,
    created_at timestamptz not null default now()
);

create table if not exists identity (
    provider   text   not null,
    subject    text   not null,
    account_id bigint not null references account (id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (provider, subject)
);

-- Browser session. The identifier is stored HASHED: a leak of the database
-- must not let anyone sign in.
create table if not exists session (
    id_hash    bytea       primary key,
    account_id bigint      not null references account (id) on delete cascade,
    created_at timestamptz not null default now(),
    expires_at timestamptz not null
);

create index if not exists session_expires on session (expires_at);
