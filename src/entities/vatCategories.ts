import type { VatCategoryType } from '@/entities/enums/vatCategoryType';

export interface VatCategory {
  id: string;
  type: VatCategoryType;
  name: string;
}
