create table if not exists teams (
  id text primary key,
  group_code text not null,
  access_code_hash text not null,
  variant text not null,
  current_stage integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists stages (
  id serial primary key,
  stage_number integer not null,
  title text not null,
  case_development text not null,
  status text not null,
  released_at timestamptz,
  closed_at timestamptz
);

create table if not exists decisions (
  id serial primary key,
  code text not null,
  stage_number integer not null,
  title text not null,
  participant_text text not null,
  immediate_effect_text text not null,
  display_order integer not null
);

create table if not exists decision_rules (
  id serial primary key,
  decision_code text not null,
  variant text not null,
  rule_type text not null,
  target_metric text not null,
  adjustment_value numeric,
  dependency_code text,
  enforcement_code text,
  stacking_group text,
  stacking_cap numeric,
  confidential_explanation text not null
);

create table if not exists submissions (
  id serial primary key,
  team_id text not null references teams(id),
  stage_number integer not null,
  selected_decision_codes text[] not null,
  submitted_at timestamptz not null default now(),
  is_locked boolean not null default false
);

create table if not exists team_positions (
  id serial primary key,
  team_id text not null references teams(id),
  stage_number integer not null,
  ap_exposure numeric not null,
  pb_exposure numeric not null,
  accumulated_premium numeric not null,
  ap_paid numeric not null,
  pb_paid numeric not null,
  costs numeric not null,
  potential_recovery numeric not null,
  realised_recovery numeric not null,
  reserve numeric not null,
  net_loss numeric not null,
  calculated_at timestamptz not null default now()
);

create table if not exists team_protections (
  id serial primary key,
  team_id text not null references teams(id),
  protection_code text not null,
  protection_type text not null,
  created_by_decision text,
  preserved_by_decision text,
  enforced_by_decision text,
  potential_value numeric,
  realised_value numeric,
  status text not null
);

create table if not exists calculation_audit (
  id serial primary key,
  team_id text not null references teams(id),
  stage_number integer not null,
  decision_code text not null,
  metric text not null,
  previous_value numeric not null,
  adjustment numeric not null,
  updated_value numeric not null,
  calculation_reason text not null,
  created_at timestamptz not null default now()
);
