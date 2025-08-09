export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      expenseCategories: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["expenseCategoryType"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["expenseCategoryType"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["expenseCategoryType"]
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          categoryId: number
          createdAt: string | null
          createdBy: string
          datePaid: string | null
          description: string | null
          expirationDate: string
          id: string
          invoiceLink: string
          organizationId: string
          paymentMethodId: number | null
          paymentReceiptLink: string | null
          status: Database["public"]["Enums"]["expenseStatus"]
          title: string
          updatedAt: string | null
          updatedBy: string | null
        }
        Insert: {
          amount: number
          categoryId: number
          createdAt?: string | null
          createdBy: string
          datePaid?: string | null
          description?: string | null
          expirationDate: string
          id?: string
          invoiceLink: string
          organizationId: string
          paymentMethodId?: number | null
          paymentReceiptLink?: string | null
          status: Database["public"]["Enums"]["expenseStatus"]
          title: string
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Update: {
          amount?: number
          categoryId?: number
          createdAt?: string | null
          createdBy?: string
          datePaid?: string | null
          description?: string | null
          expirationDate?: string
          id?: string
          invoiceLink?: string
          organizationId?: string
          paymentMethodId?: number | null
          paymentReceiptLink?: string | null
          status?: Database["public"]["Enums"]["expenseStatus"]
          title?: string
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "expenseCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_payment_method_id_fkey"
            columns: ["paymentMethodId"]
            isOneToOne: false
            referencedRelation: "paymentMethods"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string
          businessName: string
          cuit: string
          id: string
          legalName: string
          vatCategoryId: number
        }
        Insert: {
          address: string
          businessName: string
          cuit: string
          id?: string
          legalName: string
          vatCategoryId: number
        }
        Update: {
          address?: string
          businessName?: string
          cuit?: string
          id?: string
          legalName?: string
          vatCategoryId?: number
        }
        Relationships: [
          {
            foreignKeyName: "organizations_vat_category_id_fkey"
            columns: ["vatCategoryId"]
            isOneToOne: false
            referencedRelation: "vatCategories"
            referencedColumns: ["id"]
          },
        ]
      }
      paymentMethods: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["paymentMethodType"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["paymentMethodType"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["paymentMethodType"]
        }
        Relationships: []
      }
      usersOrganizations: {
        Row: {
          organizationId: string
          userId: string
        }
        Insert: {
          organizationId: string
          userId: string
        }
        Update: {
          organizationId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_organizations_organization_id_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      vatCategories: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["vatCategoryType"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["vatCategoryType"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["vatCategoryType"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      documentType: "dni" | "le" | "lc" | "ci" | "passport" | "other"
      expenseCategoryType:
        | "operating"
        | "service"
        | "supply"
        | "miscellaneous"
        | "extraordinary"
        | "salary"
        | "daily"
        | "fuel"
        | "perception"
        | "stationery"
        | "cleaning"
        | "maintenance"
        | "capture"
      expenseStatus: "paid" | "pending"
      paymentMethodType:
        | "cash"
        | "bna"
        | "mp"
        | "galicia"
        | "bbva"
        | "uala"
        | "brubank"
      userRole: "admin" | "accountant" | "clerk" | "doctor" | "patient"
      vatCategoryType:
        | "registeredResponsible"
        | "monotax"
        | "exempt"
        | "notResponsible"
        | "finalConsumer"
        | "uncategorizedSubject"
        | "unregisteredResponsible"
        | "subjectToVatWithholding"
        | "notSubjectToVat"
        | "registeredResponsibleM"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      documentType: ["dni", "le", "lc", "ci", "passport", "other"],
      expenseCategoryType: [
        "operating",
        "service",
        "supply",
        "miscellaneous",
        "extraordinary",
        "salary",
        "daily",
        "fuel",
        "perception",
        "stationery",
        "cleaning",
        "maintenance",
        "capture",
      ],
      expenseStatus: ["paid", "pending"],
      paymentMethodType: [
        "cash",
        "bna",
        "mp",
        "galicia",
        "bbva",
        "uala",
        "brubank",
      ],
      userRole: ["admin", "accountant", "clerk", "doctor", "patient"],
      vatCategoryType: [
        "registeredResponsible",
        "monotax",
        "exempt",
        "notResponsible",
        "finalConsumer",
        "uncategorizedSubject",
        "unregisteredResponsible",
        "subjectToVatWithholding",
        "notSubjectToVat",
        "registeredResponsibleM",
      ],
    },
  },
} as const
