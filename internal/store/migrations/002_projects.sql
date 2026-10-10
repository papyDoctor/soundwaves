-- A project is one scene text, named within its account. The version is the
-- ETag: a save that does not match it is refused, so two tabs cannot
-- silently overwrite each other.

create table if not exists project (
    id         bigserial   primary key,
    account_id bigint      not null references account (id) on delete cascade,
    name       text        not null,
    text       text        not null,
    version    bigint      not null default 1,
    updated_at timestamptz not null default now(),
    unique (account_id, name)
);
