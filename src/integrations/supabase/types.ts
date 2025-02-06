export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      course: {
        Row: {
          description: string
          id: number
          name: string
          thumbnail_url: string
          total_lessons: number
        }
        Insert: {
          description: string
          id?: number
          name: string
          thumbnail_url: string
          total_lessons?: number
        }
        Update: {
          description?: string
          id?: number
          name?: string
          thumbnail_url?: string
          total_lessons?: number
        }
        Relationships: []
      }
      lesson: {
        Row: {
          description: string
          id: number
          length_sec: number
          module_id: number
          name: string
          next_lesson_id: number | null
          order: number
          previous_lesson_id: number | null
          thumbnail_url: string
          video_url: string
        }
        Insert: {
          description: string
          id?: number
          length_sec: number
          module_id: number
          name: string
          next_lesson_id?: number | null
          order: number
          previous_lesson_id?: number | null
          thumbnail_url: string
          video_url: string
        }
        Update: {
          description?: string
          id?: number
          length_sec?: number
          module_id?: number
          name?: string
          next_lesson_id?: number | null
          order?: number
          previous_lesson_id?: number | null
          thumbnail_url?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "module"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_next_lesson_id_fkey"
            columns: ["next_lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_previous_lesson_id_fkey"
            columns: ["previous_lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_extras: {
        Row: {
          id: number
          label: string
          lesson_id: number
          type: string
          url: string | null
        }
        Insert: {
          id?: number
          label: string
          lesson_id: number
          type: string
          url?: string | null
        }
        Update: {
          id?: number
          label?: string
          lesson_id?: number
          type?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_extras_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson"
            referencedColumns: ["id"]
          },
        ]
      }
      module: {
        Row: {
          course_id: number
          id: number
          name: string
        }
        Insert: {
          course_id: number
          id?: number
          name: string
        }
        Update: {
          course_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          auth_id: string | null
          created_at: string
          email: string
          first_login: boolean
          full_name: string | null
          id: number
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          email: string
          first_login?: boolean
          full_name?: string | null
          id?: number
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          email?: string
          first_login?: boolean
          full_name?: string | null
          id?: number
        }
        Relationships: []
      }
      user_course: {
        Row: {
          course_id: number
          currnent_lesson_id: number | null
          id: number
          user_id: number
        }
        Insert: {
          course_id: number
          currnent_lesson_id?: number | null
          id?: number
          user_id: number
        }
        Update: {
          course_id?: number
          currnent_lesson_id?: number | null
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_course_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_course_currnent_lesson_id_fkey"
            columns: ["currnent_lesson_id"]
            isOneToOne: false
            referencedRelation: "lesson"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_course_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
