import { PaymentMethodPure } from './paymentMethod.entity';

export interface PaymentMethodFormContext extends PaymentMethodPure {
  price_id: number;
  company_id: number;
  payment_method_type_id: number;
}
