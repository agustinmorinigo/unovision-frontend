import type { ExpenseCategoryType } from '@/entities/enums/expenseCategoryType';

export interface ExpenseCategory {
  id: string;
  type: ExpenseCategoryType;
  name: string;
}
