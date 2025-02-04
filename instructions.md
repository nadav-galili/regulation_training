Below is a complete Product Requirements Document (PRD) designed for a Next.js developer building a B2B web application for employee regulation training. This document outlines the project’s vision, functionality, technical stack, user flows, and a complete Supabase database schema (with SQL queries) to guide your development.

Product Requirements Document (PRD)

1. Overview

Project Name: Regulation Training Web App
Project Type: B2B web application
Purpose: To provide employees with engaging animated tutorial guides on regulatory matters and to assess their understanding via interactive questions embedded in video playback.
Audience:
• Employees: Watch training videos, answer embedded questions, and get instant feedback.
• Administrators: Monitor test analytics, review employee performance, and track engagement metrics.

2. Objectives & Goals
   • Engagement: Deliver interactive animated tutorials that pause at designated stopping points to ask questions.
   • Assessment: Verify that employees are engaging with and understanding the training material through real-time feedback.
   • Analytics: Collect and present detailed metrics (e.g., time taken, question performance, video restarts) for each employee and overall training sessions.
   • Security: Ensure only valid employees (as recorded in the database) can access the tutorials.

3. Scope

In Scope:
• A responsive landing (home) page with two clear entry points:
• Employee Login: For accessing tutorials.
• Admin Dashboard: For viewing aggregated training analytics.
• Employee Flow:
• Login using an ID that is cross-checked with the employees table.
• Navigate to a tutorial page that loads a video assigned to the employee.
• Video playback starts in “paused” mode. On pressing “Start,” the video plays until it reaches a preconfigured stopping point.
• At stopping points, the video pauses and displays a question with multiple answers.
• Handling of wrong/right answers:
• Wrong Answer: Shows an alert; if wrong twice, an error toaster appears and the video restarts.
• Right Answer: The video resumes playback.
• End-of-video screen with a “Go Home” button.
• Admin Flow:
• Dashboard to display analytics for all employee sessions (e.g., test start times, duration, answer correctness, restart counts, overall pass/fail status).

Out of Scope:
• Custom video player development (relying on existing video components and libraries).
• Third-party integrations beyond Supabase for data storage and retrieval.

4. Target Audience
   • Employees: Users from client companies who are required to complete regulatory training.
   • Administrators/Managers: Responsible for tracking training progress, reviewing employee performance, and ensuring compliance.

5. Features & Functional Requirements

5.1. Home Screen (Landing Page)
• Design:
• A hero section with company branding.
• Two primary action buttons:
• Employee Login
• Admin Dashboard
• Functionality:
• Clear visual separation between the employee and admin portals.
• Responsive design using Tailwind CSS and Shadcn UI components.

5.2. Employee Login Flow
• Login Screen:
• Input field for Employee ID.
• Button to submit the login request.
• Validation:
• Only allow login if the provided ID exists in the employees table.
• Display error messages for invalid IDs.
• Post-Login:
• On successful login, redirect the employee to the Tutorial Page.

5.3. Tutorial Page & Video Playback
• Video Assignment:
• Upon login, fetch the list of videos associated with the employee from the many-to-many relationship between employees and videos.
• Video Behavior:
• Initial State: Video is in “stop mode” (paused).
• Start Playback: Employee presses a “Start” button.
• Stop Points:
• The video pauses at pre-configured stopping points defined in the video_stopping_points table.
• When a stop is reached, fetch the associated question (and its answers) from the questions and answers tables.
• Question Handling:
• On Wrong Answer (First Attempt):
• Show an alert notifying the employee that the answer is incorrect.
• Log the wrong attempt.
• On Wrong Answer (Second Attempt):
• Show an error toaster notification.
• Restart the video from the beginning.
• Log a “restart” event.
• On Correct Answer:
• Resume video playback automatically.
• Completion:
• At the end of the video, display a “Go Home” button to navigate back to the landing page.
• Analytics Tracking:
• Log session details such as start time, end time, duration, correct/incorrect answers, and number of restarts (stored in the test_sessions and question_responses tables).

5.4. Admin Dashboard
• Data Presentation:
• View detailed analytics for each employee:
• Test start time.
• Total duration.
• Count of correct vs. wrong answers.
• Number of video restarts.
• Aggregate analytics:
• Total number of employees who have started, passed, or failed the test.
• Number of employees who did not start.
• Data Filters & Views:
• Filters to view metrics by date range, video, department, etc. (if applicable).
• Visualization components (charts, tables) using Shadcn components and Tailwind CSS.

6. Technical Requirements

6.1. Tech Stack
• Frontend:
• Next.js (React framework) with TypeScript for type safety.
• Tailwind CSS for styling.
• Shadcn UI for pre-built, accessible UI components.
• Backend & Data Storage:
• Supabase for:
• Database (PostgreSQL) storage.
• Data fetching and updates via Supabase client libraries.
• Real-time features (if needed).
• Video Playback:
• Utilize an existing video player library/component compatible with Next.js.

6.2. Integration Points
• Supabase Client:
• Use the Supabase JS/TS SDK for authentication, querying, and mutations.
• Routing:
• Next.js dynamic routing for pages (landing, login, tutorial, dashboard).
• State Management:
• Use React context or state management libraries (if needed) to manage session and playback states.

6.3. Non-Functional Requirements
• Performance:
• Fast load times and responsive UI.
• Security:
• Validate employee IDs against the database.
• Secure API endpoints and data access.
• Scalability:
• The design should support a growing number of employees and video tutorials.
• Accessibility:
• Use accessible components from Shadcn and ensure the interface meets accessibility standards.

7. UI/UX Design Guidelines
   • Consistent Branding:
   • Align with the company’s branding and design standards.
   • Responsive Design:
   • Ensure the web app works across desktop, tablet, and mobile devices.
   • User Feedback:
   • Immediate visual feedback for actions (alerts, toasters, loading states).
   • Intuitive Navigation:
   • Clear call-to-action buttons and easy navigation between screens.
   • Minimal Distraction:
   • During video playback, keep UI overlays minimal so as not to distract from the content.

8. Data Flow & Architecture

   1. Landing Page:
      • User lands on the home screen and selects either “Employee Login” or “Admin Dashboard.”
   2. Employee Login Flow:
      • Employee enters their ID.
      • Frontend calls Supabase to validate the ID against the employees table.
      • On success, the user is routed to the Tutorial Page.
   3. Tutorial Page:
      • Fetch assigned videos via a join query on employee_videos.
      • When the video starts, the app listens for time events to know when to pause at stopping points.
      • On reaching a stopping point:
      • Query the video_stopping_points table for the current video.
      • Fetch the associated question from the questions table and its answers from the answers table.
      • Record responses in the question_responses table and update session analytics in test_sessions.
   4. Admin Dashboard:
      • Query aggregated data from test_sessions and question_responses.
      • Present data in a dashboard format with filtering and visualization options.

9. Supabase Database Schema & SQL Queries

Below is a detailed structure for the Supabase (PostgreSQL) database along with SQL queries to create the necessary tables, indexes, and foreign keys.

    Note: Ensure that the PostgreSQL extension for UUID generation is enabled (e.g., using CREATE EXTENSION IF NOT EXISTS "uuid-ossp";).

9.1. Employees Table

CREATE TABLE IF NOT EXISTS employees (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
employee_identifier VARCHAR(255) UNIQUE NOT NULL, -- The ID used for login
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE,
created_at TIMESTAMP DEFAULT NOW()
);

9.2. Videos Table

CREATE TABLE IF NOT EXISTS videos (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
title VARCHAR(255) NOT NULL,
video_url TEXT NOT NULL,
description TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

9.3. Employee-Videos (Join Table)

CREATE TABLE IF NOT EXISTS employee_videos (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
employee_id UUID NOT NULL,
video_id UUID NOT NULL,
assigned_at TIMESTAMP DEFAULT NOW(),
UNIQUE(employee_id, video_id),
FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

9.4. Video Stopping Points Table

CREATE TABLE IF NOT EXISTS video_stopping_points (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
video_id UUID NOT NULL,
stop_time_seconds INT NOT NULL, -- The time (in seconds) when the video should pause
order_index INT, -- Optional: to define order if multiple stops occur at the same time
created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

9.5. Questions Table

CREATE TABLE IF NOT EXISTS questions (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
stopping_point_id UUID NOT NULL,
question_text TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (stopping_point_id) REFERENCES video_stopping_points(id) ON DELETE CASCADE
);

9.6. Answers Table

CREATE TABLE IF NOT EXISTS answers (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
question_id UUID NOT NULL,
answer_text TEXT NOT NULL,
is_correct BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

9.7. Test Sessions Table (Tracking overall video attempt per employee)

CREATE TABLE IF NOT EXISTS test_sessions (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
employee_id UUID NOT NULL,
video_id UUID NOT NULL,
started_at TIMESTAMP DEFAULT NOW(),
ended_at TIMESTAMP,
total_duration INT, -- in seconds
right_count INT DEFAULT 0,
wrong_count INT DEFAULT 0,
restart_count INT DEFAULT 0,
status VARCHAR(50) DEFAULT 'in_progress', -- Possible values: in_progress, passed, failed
created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

9.8. Question Responses Table (Detailed logs per question attempt)

CREATE TABLE IF NOT EXISTS question_responses (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
test_session_id UUID NOT NULL,
question_id UUID NOT NULL,
answer_id UUID, -- The answer selected (can be NULL if no selection)
is_correct BOOLEAN,
attempt_number INT DEFAULT 1,
responded_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (test_session_id) REFERENCES test_sessions(id) ON DELETE CASCADE,
FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
FOREIGN KEY (answer_id) REFERENCES answers(id) ON DELETE SET NULL
);

9.9. Indexes (Example Indexes for performance)

-- Index on employee_videos for faster join queries
CREATE INDEX IF NOT EXISTS idx_employee_videos_employee_id ON employee_videos(employee_id);

-- Index on video_stopping_points to quickly retrieve stops for a video
CREATE INDEX IF NOT EXISTS idx_video_stopping_points_video_id ON video_stopping_points(video_id);

-- Index on test_sessions to speed up queries by employee
CREATE INDEX IF NOT EXISTS idx_test_sessions_employee_id ON test_sessions(employee_id);

10. API Endpoints (Conceptual)

While the exact endpoints will be implemented within Next.js API routes and through the Supabase client, here is an outline of the API interactions:
• Authentication & Employee Verification:
• POST /api/login
Payload: { employeeId: string }
Action: Validate the employee ID against the employees table.
• Fetching Assigned Videos:
• GET /api/employee/videos
Action: Retrieve videos associated with the logged-in employee.
• Fetching Video Stopping Points & Questions:
• GET /api/videos/:videoId/stops
Action: Retrieve stopping points for a given video.
• GET /api/stops/:stopId/question
Action: Retrieve the question and possible answers for a stop.
• Recording Responses & Analytics:
• POST /api/test-sessions
Action: Create a new test session.
• POST /api/question-responses
Action: Record an answer attempt for a question.
• Dashboard Analytics:
• GET /api/dashboard/analytics
Action: Retrieve aggregated training session metrics for admin view.

11. Milestones & Timelines
    • Week 1–2:
    • Finalize UI/UX design and wireframes.
    • Set up project scaffolding (Next.js with TypeScript, Tailwind CSS, Shadcn UI integration).
    • Configure Supabase and establish database schema.
    • Week 3–4:
    • Implement landing page and employee login flow.
    • Develop video playback with stopping point detection.
    • Week 5–6:
    • Integrate question handling logic (alerts, error toasters, video restart logic).
    • Begin logging analytics in test sessions and question responses.
    • Week 7–8:
    • Build and test the admin dashboard.
    • QA, user testing, and final adjustments.
    • Week 9:
    • Deployment preparations and go-live.

12. Assumptions & Dependencies
    • Employee IDs are pre-populated in the employees table.
    • Videos and their stopping points (with associated questions and answers) are pre-configured in the database.
    • A third-party video player component/library is available and compatible with Next.js.
    • Supabase is the primary backend service for data storage and retrieval; any additional custom APIs will be built using Next.js API routes.

13. Conclusion

This PRD outlines the complete vision for building an interactive regulation training web application using Next.js, TypeScript, Tailwind, Shadcn UI, and Supabase. The document details the user flows (from landing page to employee login, video playback with interactive questions, and the admin dashboard) as well as a fully designed Supabase database schema complete with SQL creation scripts.

By following this document, the development team will be well-equipped to implement the project with clear guidance on both front-end and back-end components, ensuring a secure, responsive, and engaging user experience.

Feel free to ask if you have any questions or need further clarifications on any part of this PRD!
