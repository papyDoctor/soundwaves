-- Anonymous shared scenes: a random id in the link, no account. Whoever has
-- the link reads it; whoever has the edit key (kept by the browser that made
-- it) updates it. The key is stored HASHED, like a session.
--
-- accessed_at lets a sweep drop links nobody opened for a long time.

create table if not exists share (
    id           text        primary key,
    name         text        not null,
    text         text        not null,
    edit_key_hash bytea      not null,
    created_at   timestamptz not null default now(),
    accessed_at  timestamptz not null default now()
);
