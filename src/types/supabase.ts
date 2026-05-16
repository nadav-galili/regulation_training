export type Database = {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string;
          employee_identifier: string;
          name: string;
          email: string | null;
          password: string | null;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_identifier: string;
          name: string;
          email?: string | null;
          password?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_identifier?: string;
          name?: string;
          email?: string | null;
          password?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          video_url: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          video_url: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          video_url?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      employee_videos: {
        Row: {
          id: string;
          employee_id: string;
          video_id: string;
          assigned_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          video_id: string;
          assigned_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          video_id?: string;
          assigned_at?: string;
        };
      };
      video_stopping_points: {
        Row: {
          id: string;
          video_id: string;
          stop_time_seconds: number;
          order_index: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          video_id: string;
          stop_time_seconds: number;
          order_index?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          video_id?: string;
          stop_time_seconds?: number;
          order_index?: number | null;
          created_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          stopping_point_id: string;
          question_text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          stopping_point_id: string;
          question_text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          stopping_point_id?: string;
          question_text?: string;
          created_at?: string;
        };
      };
      answers: {
        Row: {
          id: string;
          question_id: string;
          answer_text: string;
          is_correct: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_id: string;
          answer_text: string;
          is_correct?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          question_id?: string;
          answer_text?: string;
          is_correct?: boolean;
          created_at?: string;
        };
      };
      test_sessions: {
        Row: {
          id: string;
          employee_id: string;
          video_id: string;
          started_at: string;
          ended_at: string | null;
          total_duration: number | null;
          right_count: number;
          wrong_count: number;
          restart_count: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          video_id: string;
          started_at?: string;
          ended_at?: string | null;
          total_duration?: number | null;
          right_count?: number;
          wrong_count?: number;
          restart_count?: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          video_id?: string;
          started_at?: string;
          ended_at?: string | null;
          total_duration?: number | null;
          right_count?: number;
          wrong_count?: number;
          restart_count?: number;
          status?: string;
          created_at?: string;
        };
      };
      question_responses: {
        Row: {
          id: string;
          test_session_id: string;
          question_id: string;
          answer_id: string | null;
          is_correct: boolean | null;
          attempt_number: number;
          responded_at: string;
        };
        Insert: {
          id?: string;
          test_session_id: string;
          question_id: string;
          answer_id?: string | null;
          is_correct?: boolean | null;
          attempt_number?: number;
          responded_at?: string;
        };
        Update: {
          id?: string;
          test_session_id?: string;
          question_id?: string;
          answer_id?: string | null;
          is_correct?: boolean | null;
          attempt_number?: number;
          responded_at?: string;
        };
      };
    };
  };
};
