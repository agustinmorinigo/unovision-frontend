import type { PaymentMethodType } from '@/entities/enums/paymentMethodType';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
}
