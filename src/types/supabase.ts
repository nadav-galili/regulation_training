export type Database = {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string;
          employee_identifier: string;
          name: string;
          email: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_identifier: string;
          name: string;
          email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_identifier?: string;
          name?: string;
          email?: string | null;
          created_at?: string;
        };
      };
      // Add other tables as needed
    };
  };
};
