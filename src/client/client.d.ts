export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instanciate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '12.2.12 (cd3cf9e)';
	};
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			expense_categories: {
				Row: {
					id: number;
					name: string;
					type: Database['public']['Enums']['expense_category_type'];
				};
				Insert: {
					id?: number;
					name: string;
					type: Database['public']['Enums']['expense_category_type'];
				};
				Update: {
					id?: number;
					name?: string;
					type?: Database['public']['Enums']['expense_category_type'];
				};
				Relationships: [];
			};
			expenses: {
				Row: {
					amount: number;
					category_id: number;
					created_at: string | null;
					created_by: string;
					date_paid: string | null;
					description: string | null;
					expiration_date: string;
					id: string;
					invoice_link: string;
					organization_id: string;
					payment_method_id: number | null;
					payment_receipt_link: string | null;
					status: Database['public']['Enums']['expense_status'];
					title: string;
					updated_at: string | null;
					updated_by: string | null;
				};
				Insert: {
					amount: number;
					category_id: number;
					created_at?: string | null;
					created_by: string;
					date_paid?: string | null;
					description?: string | null;
					expiration_date: string;
					id?: string;
					invoice_link: string;
					organization_id: string;
					payment_method_id?: number | null;
					payment_receipt_link?: string | null;
					status: Database['public']['Enums']['expense_status'];
					title: string;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Update: {
					amount?: number;
					category_id?: number;
					created_at?: string | null;
					created_by?: string;
					date_paid?: string | null;
					description?: string | null;
					expiration_date?: string;
					id?: string;
					invoice_link?: string;
					organization_id?: string;
					payment_method_id?: number | null;
					payment_receipt_link?: string | null;
					status?: Database['public']['Enums']['expense_status'];
					title?: string;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'expenses_category_id_fkey';
						columns: ['category_id'];
						isOneToOne: false;
						referencedRelation: 'expense_categories';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'expenses_organization_id_fkey';
						columns: ['organization_id'];
						isOneToOne: false;
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'expenses_payment_method_id_fkey';
						columns: ['payment_method_id'];
						isOneToOne: false;
						referencedRelation: 'payment_methods';
						referencedColumns: ['id'];
					},
				];
			};
			organizations: {
				Row: {
					address: string;
					business_name: string;
					cuit: string;
					id: string;
					legal_name: string;
					vat_category_id: number;
				};
				Insert: {
					address: string;
					business_name: string;
					cuit: string;
					id?: string;
					legal_name: string;
					vat_category_id: number;
				};
				Update: {
					address?: string;
					business_name?: string;
					cuit?: string;
					id?: string;
					legal_name?: string;
					vat_category_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'organizations_vat_category_id_fkey';
						columns: ['vat_category_id'];
						isOneToOne: false;
						referencedRelation: 'vat_categories';
						referencedColumns: ['id'];
					},
				];
			};
			payment_methods: {
				Row: {
					id: number;
					name: string;
					type: Database['public']['Enums']['payment_method_type'];
				};
				Insert: {
					id?: number;
					name: string;
					type: Database['public']['Enums']['payment_method_type'];
				};
				Update: {
					id?: number;
					name?: string;
					type?: Database['public']['Enums']['payment_method_type'];
				};
				Relationships: [];
			};
			users_organizations: {
				Row: {
					organization_id: string;
					user_id: string;
				};
				Insert: {
					organization_id: string;
					user_id: string;
				};
				Update: {
					organization_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'users_organizations_organization_id_fkey';
						columns: ['organization_id'];
						isOneToOne: false;
						referencedRelation: 'organizations';
						referencedColumns: ['id'];
					},
				];
			};
			vat_categories: {
				Row: {
					id: number;
					name: string;
					type: Database['public']['Enums']['vat_category_type'];
				};
				Insert: {
					id?: number;
					name: string;
					type: Database['public']['Enums']['vat_category_type'];
				};
				Update: {
					id?: number;
					name?: string;
					type?: Database['public']['Enums']['vat_category_type'];
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			document_type: 'dni' | 'le' | 'lc' | 'ci' | 'passport' | 'other';
			expense_category_type:
				| 'operating'
				| 'service'
				| 'supply'
				| 'miscellaneous'
				| 'extraordinary'
				| 'salary'
				| 'daily'
				| 'fuel'
				| 'perception'
				| 'stationery'
				| 'cleaning'
				| 'maintenance'
				| 'capture';
			expense_status: 'paid' | 'pending';
			payment_method_type: 'cash' | 'bna' | 'mp' | 'galicia' | 'bbva' | 'uala' | 'brubank';
			user_role: 'admin' | 'accountant' | 'clerk' | 'doctor' | 'patient';
			vat_category_type:
				| 'registered_responsible'
				| 'monotax'
				| 'exempt'
				| 'not_responsible'
				| 'final_consumer'
				| 'uncategorized_subject'
				| 'unregistered_responsible'
				| 'subject_to_vat_withholding'
				| 'not_subject_to_vat'
				| 'registered_responsible_m';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {
			document_type: ['dni', 'le', 'lc', 'ci', 'passport', 'other'],
			expense_category_type: [
				'operating',
				'service',
				'supply',
				'miscellaneous',
				'extraordinary',
				'salary',
				'daily',
				'fuel',
				'perception',
				'stationery',
				'cleaning',
				'maintenance',
				'capture',
			],
			expense_status: ['paid', 'pending'],
			payment_method_type: ['cash', 'bna', 'mp', 'galicia', 'bbva', 'uala', 'brubank'],
			user_role: ['admin', 'accountant', 'clerk', 'doctor', 'patient'],
			vat_category_type: [
				'registered_responsible',
				'monotax',
				'exempt',
				'not_responsible',
				'final_consumer',
				'uncategorized_subject',
				'unregistered_responsible',
				'subject_to_vat_withholding',
				'not_subject_to_vat',
				'registered_responsible_m',
			],
		},
	},
} as const;
