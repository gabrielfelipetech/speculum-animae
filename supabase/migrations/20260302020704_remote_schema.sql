drop extension if exists "pg_net";


  create table "public"."profiles" (
    "id" uuid not null,
    "full_name" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."test_results" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" text not null,
    "user_id" uuid default auth.uid(),
    "client_id" text,
    "slug" text not null,
    "results" jsonb not null,
    "top_summaries" jsonb,
    "meta" jsonb,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."test_results" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX test_results_pkey ON public.test_results USING btree (id);

CREATE UNIQUE INDEX test_results_session_id_idx ON public.test_results USING btree (session_id);

CREATE UNIQUE INDEX test_results_session_id_key ON public.test_results USING btree (session_id);

CREATE INDEX test_results_user_id_created_at_idx ON public.test_results USING btree (user_id, created_at DESC);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."test_results" add constraint "test_results_pkey" PRIMARY KEY using index "test_results_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."test_results" add constraint "test_results_session_id_key" UNIQUE using index "test_results_session_id_key";

alter table "public"."test_results" add constraint "test_results_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."test_results" validate constraint "test_results_user_id_fkey";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."test_results" to "anon";

grant insert on table "public"."test_results" to "anon";

grant references on table "public"."test_results" to "anon";

grant select on table "public"."test_results" to "anon";

grant trigger on table "public"."test_results" to "anon";

grant truncate on table "public"."test_results" to "anon";

grant update on table "public"."test_results" to "anon";

grant delete on table "public"."test_results" to "authenticated";

grant insert on table "public"."test_results" to "authenticated";

grant references on table "public"."test_results" to "authenticated";

grant select on table "public"."test_results" to "authenticated";

grant trigger on table "public"."test_results" to "authenticated";

grant truncate on table "public"."test_results" to "authenticated";

grant update on table "public"."test_results" to "authenticated";

grant delete on table "public"."test_results" to "service_role";

grant insert on table "public"."test_results" to "service_role";

grant references on table "public"."test_results" to "service_role";

grant select on table "public"."test_results" to "service_role";

grant trigger on table "public"."test_results" to "service_role";

grant truncate on table "public"."test_results" to "service_role";

grant update on table "public"."test_results" to "service_role";


  create policy "Profiles are insertable by owner"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "Profiles are updatable by owner"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Profiles are viewable by owner"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));



  create policy "Users can insert own test results"
  on "public"."test_results"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Users can read own test results"
  on "public"."test_results"
  as permissive
  for select
  to authenticated
using ((user_id = auth.uid()));



