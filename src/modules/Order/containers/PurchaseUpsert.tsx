import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { PaymentMethod } from '@src/modules/PaymentMethod';
import { PaymentTerm } from '@src/modules/PaymentTerm';
import { ShippingProfile } from '@src/modules/ShippingProfile';
import { ContactGroup } from '@src/modules/Subdomain';
import { Supplier } from '@src/modules/Supplier';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import PurchaseForm from '../components/PurchaseForm';
import { PurchaseSalePure } from '../model/purchase.entity';
import PurchaseModule from '../Purchase.module';

const PurchaseUpsert: React.FC<GlobalUpsertProps<PurchaseSalePure>> = ({ onCallback }) => {
  const module = new PurchaseModule();

  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<FormContext>) => {
    return module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: FormModel) => {
    mutate(
      {
        values: {
          company_id: formValues.company.id,
          supplier_id: formValues.supplier.id,
          invoice_contact_group_id: formValues.invoice_contact_group.id,
          delivery_contact_group_id: formValues.delivery_contact_group.id,
          payment_method_id: formValues.payment_method.id,
          early_payment_discount_days: formValues.early_payment_discount_days,
          early_payment_discount_percentage: formValues.early_payment_discount_percentage,
          payment_status: formValues.payment_status,
          shipping_profile_id: formValues.shipping_profile?.id,
          delivery_date: formValues.delivery_date
            ? new Date(formValues.delivery_date).toISOString().split('T')[0]
            : undefined,
          estimate_payment_date: formValues.estimate_payment_date
            ? new Date(formValues.estimate_payment_date).toISOString().split('T')[0]
            : undefined,
          incoming_items: undefined,
          payment_term_id: formValues.payment_term?.id,
          pay_date: formValues.pay_date
            ? new Date(formValues.pay_date).toISOString().split('T')[0]
            : undefined,
        },
      },
      { onSuccess: onCallback },
    );
  };

  return <PurchaseForm onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PurchaseUpsert;

// This is unbelievable we didn't even share this model between form and upsert files. we wrote it again :O
interface FormModel {
  supplier: Supplier;
  company: CompanyModel;
  invoice_contact_group: ContactGroup;
  delivery_contact_group: ContactGroup;
  payment_method: PaymentMethod;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  payment_status: string;
  shipping_profile: ShippingProfile | null;
  delivery_date: string | null;
  estimate_payment_date: string | null;
  incoming_items: string | null;
  payment_term: PaymentTerm;
  pay_date: string | null;
}

interface FormContext {
  company_id: number;
  supplier_id: number;
  invoice_contact_group_id: number;
  delivery_contact_group_id: number;
  payment_method_id: number;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  payment_status: string;
  shipping_profile_id: number | null;
  delivery_date: string | null;
  estimate_payment_date: string | null;
  incoming_items: string | null;
  payment_term_id: number;
  pay_date: string | null;
}
