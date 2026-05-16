-- Initial schema for regulation_training
-- Mirrors the PRD in instructions.md, plus is_admin/password columns the
-- app already relies on (src/app/admin/login/page.tsx).
--
-- NOTE on RLS: this app does not use Supabase Auth — it does its own
-- identifier-based "login" with the anon key. Policies below are permissive
-- for the anon role so the existing app keeps working on a local stack.
-- DO NOT ship these policies to production as-is.

create extension if not exists "uuid-ossp";

-- employees ------------------------------------------------------------------
create table if not exists employees (
  id                  uuid primary key default uuid_generate_v4(),
  employee_identifier varchar(255) unique not null,
  name                varchar(255) not null,
  email               varchar(255) unique,
  password            varchar(255),
  is_admin            boolean not null default false,
  created_at          timestamptz not null default now()
);

-- videos ---------------------------------------------------------------------
create table if not exists videos (
  id          uuid primary key default uuid_generate_v4(),
  title       varchar(255) not null,
  video_url   text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- employee_videos (assignment join) -----------------------------------------
create table if not exists employee_videos (
  id          uuid primary key default uuid_generate_v4(),
  employee_id uuid not null references employees(id) on delete cascade,
  video_id    uuid not null references videos(id)    on delete cascade,
  assigned_at timestamptz not null default now(),
  unique (employee_id, video_id)
);

-- video_stopping_points ------------------------------------------------------
create table if not exists video_stopping_points (
  id                 uuid primary key default uuid_generate_v4(),
  video_id           uuid not null references videos(id) on delete cascade,
  stop_time_seconds  int  not null,
  order_index        int,
  created_at         timestamptz not null default now()
);

-- questions ------------------------------------------------------------------
create table if not exists questions (
  id                uuid primary key default uuid_generate_v4(),
  stopping_point_id uuid not null references video_stopping_points(id) on delete cascade,
  question_text     text not null,
  created_at        timestamptz not null default now()
);

-- answers --------------------------------------------------------------------
create table if not exists answers (
  id          uuid primary key default uuid_generate_v4(),
  question_id uuid not null references questions(id) on delete cascade,
  answer_text text not null,
  is_correct  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- test_sessions --------------------------------------------------------------
create table if not exists test_sessions (
  id             uuid primary key default uuid_generate_v4(),
  employee_id    uuid not null references employees(id) on delete cascade,
  video_id       uuid not null references videos(id)    on delete cascade,
  started_at     timestamptz not null default now(),
  ended_at       timestamptz,
  total_duration int,
  right_count    int not null default 0,
  wrong_count    int not null default 0,
  restart_count  int not null default 0,
  status         varchar(50) not null default 'in_progress',
  created_at     timestamptz not null default now()
);

-- question_responses ---------------------------------------------------------
create table if not exists question_responses (
  id              uuid primary key default uuid_generate_v4(),
  test_session_id uuid not null references test_sessions(id) on delete cascade,
  question_id     uuid not null references questions(id)     on delete cascade,
  answer_id       uuid references answers(id) on delete set null,
  is_correct      boolean,
  attempt_number  int not null default 1,
  responded_at    timestamptz not null default now()
);

-- indexes --------------------------------------------------------------------
create index if not exists idx_employee_videos_employee_id    on employee_videos(employee_id);
create index if not exists idx_video_stopping_points_video_id on video_stopping_points(video_id);
create index if not exists idx_test_sessions_employee_id      on test_sessions(employee_id);
create index if not exists idx_questions_stopping_point_id    on questions(stopping_point_id);
create index if not exists idx_answers_question_id            on answers(question_id);

-- RLS ------------------------------------------------------------------------
-- Enable RLS on every table in the public (exposed) schema.
alter table employees             enable row level security;
alter table videos                enable row level security;
alter table employee_videos       enable row level security;
alter table video_stopping_points enable row level security;
alter table questions             enable row level security;
alter table answers               enable row level security;
alter table test_sessions         enable row level security;
alter table question_responses    enable row level security;

-- Permissive policies for the anon role. This matches how the app currently
-- works (no Supabase Auth, identifier-based login via the anon key).
-- Tighten before going to production.
create policy "anon read employees"              on employees             for select to anon using (true);
create policy "anon read videos"                 on videos                for select to anon using (true);
create policy "anon read employee_videos"        on employee_videos       for select to anon using (true);
create policy "anon read video_stopping_points"  on video_stopping_points for select to anon using (true);
create policy "anon read questions"              on questions             for select to anon using (true);
create policy "anon read answers"                on answers               for select to anon using (true);

create policy "anon rw test_sessions"            on test_sessions         for all    to anon using (true) with check (true);
create policy "anon rw question_responses"       on question_responses    for all    to anon using (true) with check (true);
