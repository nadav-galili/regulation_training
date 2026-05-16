-- Demo data so the app is immediately usable on a fresh `supabase start`.
-- Matches the credentials the UI advertises:
--   admin    -> identifier 1234 / password 1234
--   employee -> identifier 4567

-- Employees ------------------------------------------------------------------
insert into employees (id, employee_identifier, name, email, password, is_admin) values
  ('11111111-1111-1111-1111-111111111111', '1234', 'מנהל המערכת', 'admin@example.com', '1234', true),
  ('22222222-2222-2222-2222-222222222222', '4567', 'ישראל ישראלי', 'employee@example.com', null, false)
on conflict (employee_identifier) do nothing;

-- Videos ---------------------------------------------------------------------
-- Uses the local asset in /public/regulation.mp4 so the demo works offline.
insert into videos (id, title, video_url, description) values
  ('33333333-3333-3333-3333-333333333333',
   'הדרכת רגולציה',
   '/regulation.mp4',
   'הדרכה אינטראקטיבית בנושא רגולציה')
on conflict (id) do nothing;

-- Assign the demo video to the demo employee ---------------------------------
insert into employee_videos (employee_id, video_id) values
  ('22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333')
on conflict (employee_id, video_id) do nothing;

-- Stopping points ------------------------------------------------------------
insert into video_stopping_points (id, video_id, stop_time_seconds, order_index) values
  ('44444444-4444-4444-4444-444444444441', '33333333-3333-3333-3333-333333333333', 10, 1),
  ('44444444-4444-4444-4444-444444444442', '33333333-3333-3333-3333-333333333333', 25, 2)
on conflict (id) do nothing;

-- Questions ------------------------------------------------------------------
insert into questions (id, stopping_point_id, question_text) values
  ('55555555-5555-5555-5555-555555555551',
   '44444444-4444-4444-4444-444444444441',
   'מהי החובה העיקרית של העובד על פי הרגולציה?'),
  ('55555555-5555-5555-5555-555555555552',
   '44444444-4444-4444-4444-444444444442',
   'מה יש לעשות במקרה של חשד להפרת רגולציה?')
on conflict (id) do nothing;

-- Answers --------------------------------------------------------------------
insert into answers (question_id, answer_text, is_correct) values
  ('55555555-5555-5555-5555-555555555551', 'לדווח על כל אירוע חריג למנהל', true),
  ('55555555-5555-5555-5555-555555555551', 'להתעלם מהאירוע',                 false),
  ('55555555-5555-5555-5555-555555555551', 'לפרסם את האירוע ברשתות החברתיות', false),

  ('55555555-5555-5555-5555-555555555552', 'לדווח לממונה על האכיפה בארגון',  true),
  ('55555555-5555-5555-5555-555555555552', 'לטפל בעניין באופן עצמאי',         false),
  ('55555555-5555-5555-5555-555555555552', 'להמתין שמישהו אחר ידווח',         false)
on conflict do nothing;
