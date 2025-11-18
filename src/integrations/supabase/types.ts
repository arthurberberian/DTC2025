export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      application_assignments_log: {
        Row: {
          application_id: string
          assigned_at: string
          assigned_by: string | null
          assigned_to: string | null
          id: string
          previous_closer: string | null
        }
        Insert: {
          application_id: string
          assigned_at?: string
          assigned_by?: string | null
          assigned_to?: string | null
          id?: string
          previous_closer?: string | null
        }
        Update: {
          application_id?: string
          assigned_at?: string
          assigned_by?: string | null
          assigned_to?: string | null
          id?: string
          previous_closer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_assignments_log_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          age: number | null
          assigned_to: string | null
          closer_notes: string | null
          commitment_score: number | null
          consent_lgpd: boolean | null
          created_at: string | null
          email: string
          experience_level: string | null
          follow_up_date: string | null
          form_type: string | null
          full_name: string
          id: string
          investment_willingness: string | null
          main_challenge: string | null
          main_goal: string | null
          phone: string
          professional_area: string | null
          qualification_score: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          assigned_to?: string | null
          closer_notes?: string | null
          commitment_score?: number | null
          consent_lgpd?: boolean | null
          created_at?: string | null
          email: string
          experience_level?: string | null
          follow_up_date?: string | null
          form_type?: string | null
          full_name: string
          id?: string
          investment_willingness?: string | null
          main_challenge?: string | null
          main_goal?: string | null
          phone: string
          professional_area?: string | null
          qualification_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          assigned_to?: string | null
          closer_notes?: string | null
          commitment_score?: number | null
          consent_lgpd?: boolean | null
          created_at?: string | null
          email?: string
          experience_level?: string | null
          follow_up_date?: string | null
          form_type?: string | null
          full_name?: string
          id?: string
          investment_willingness?: string | null
          main_challenge?: string | null
          main_goal?: string | null
          phone?: string
          professional_area?: string | null
          qualification_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      submission_attempts: {
        Row: {
          attempt_type: string
          attempted_at: string | null
          id: string
          identifier: string
          success: boolean | null
        }
        Insert: {
          attempt_type: string
          attempted_at?: string | null
          id?: string
          identifier: string
          success?: boolean | null
        }
        Update: {
          attempt_type?: string
          attempted_at?: string | null
          id?: string
          identifier?: string
          success?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      closer_stats: {
        Row: {
          closer_email: string | null
          closer_name: string | null
          status_contacted: number | null
          status_converted: number | null
          status_lost: number | null
          status_new: number | null
          status_qualified: number | null
          total_assigned: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_application_to_closer: {
        Args: { _application_id: string; _closer_id: string }
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          _attempt_type: string
          _identifier: string
          _max_attempts?: number
          _time_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_old_submission_attempts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_applications_with_closer_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          age: number
          assigned_to: string
          closer_email: string
          closer_name: string
          created_at: string
          email: string
          form_type: string
          full_name: string
          id: string
          phone: string
          qualification_score: number
          status: string
        }[]
      }
      get_unassigned_applications_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_submission_attempt: {
        Args: { _attempt_type: string; _identifier: string; _success?: boolean }
        Returns: undefined
      }
      unassign_application: {
        Args: { _application_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "closer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "closer"],
    },
  },
} as const
