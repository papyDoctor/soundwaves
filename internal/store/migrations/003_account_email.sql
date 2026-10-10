-- Several verified addresses per account: a Google address and a GitHub
-- address have no reason to be the same, and without this the second sign-in
-- would create a duplicate account.
--
-- The address is a HINT for linking, never the key of the account: that
-- stays (provider, subject), which never changes hands.

create table if not exists account_email (
    email      text        primary key,
    account_id bigint      not null references account (id) on delete cascade,
    created_at timestamptz not null default now()
);

create index if not exists account_email_account on account_email (account_id);

alter table identity add column if not exists email text;
