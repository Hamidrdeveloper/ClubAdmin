export interface PaymentMethodType {
  id: number;
  name: string;
  title: string;
  // For now we just support string types, and didn't see that we have otherwise
  data: Record<string, 'string'>;
}
