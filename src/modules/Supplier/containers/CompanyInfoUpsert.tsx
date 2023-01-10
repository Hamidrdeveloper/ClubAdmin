/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { Role } from '@src/modules/Role';
import { UserToggler } from '@src/modules/User';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { message } from 'antd';
import React, { FC } from 'react';
import { QueryObserverResult, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyInfoForm from '../components/CompanyInfoForm';
import { SupplierFormContext } from '../model/supplier-args.entity';
import syncFlagsService from '../service/syncFlags';
import syncRolesService from '../service/syncRoles';
import SupplierModule from '../Supplier.module';
import { Supplier } from '..';

interface Props extends GlobalUpsertProps<Supplier> {
  editMode: boolean;
  // refetch: Dispatch<SetStateAction<boolean>>;
  // refetch: (options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<unknown, unknown>>;
  refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
}

const CompanyInfoUpsert: FC<Props> = ({ editMode, singleData, refetch }) => {
  const navigate = useNavigate();
  const { supplier_id: id } = useParams();
  const module = new SupplierModule();

  const { mutate: toggleActivate, isLoading: deActivePending } = useMutation(
    ({ id, values }: GlobalMutationProps<UserToggler>) => {
      return module.apiService.request({ url: `/users/${id}/active-status`, body: values, method: 'PUT' });
    },
  );

  const { mutate: submit, isLoading: submitPending } = useMutation(
    ({ id, values }: GlobalMutationProps<Supplier>) => {
      return editMode && id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
    },
  );

  const { mutate: syncFlags, isLoading: syncFlagPending } = useMutation(syncFlagsService);

  const { mutate: syncRoles, isLoading: syncRolePending } = useMutation(syncRolesService);

  const handleFormSubmit = (formValues: Supplier) => {
    const {
      communication_by_letter,
      contactGroup,
      paymentTerm,
      shippingMethod,
      user,
      is_vat_valid,
      ...restValues
    } = formValues;

    const values: Partial<SupplierFormContext> = {
      ...restValues,
      contact_group_id: contactGroup?.id,
      is_vat_valid: is_vat_valid ?? false,
      default_payment_terms_id: paymentTerm?.id ?? undefined,
      communication_by_letter: communication_by_letter ?? false,
      default_shipping_method_id: shippingMethod?.id ?? undefined,
      user: user?.username && user?.password && user?.email && user?.telephone_number ? user : undefined,
    };
    submit(
      { id: singleData?.id ?? undefined, values },
      {
        onSuccess: () => {
          // NOTE navigate to the created supplier manage page
          // if (!id) navigate(`./${data?.id}`);
          // if its creating supplier navigate to supplier list page

          if (!id) navigate('../');

          refetch();
        },
      },
    );
  };

  const handleDeactivate = () => {
    if (!editMode) return;

    const user = singleData?.people?.user;
    const values: UserToggler = {
      is_active: !user?.is_active,
    };
    toggleActivate(
      { id: singleData ? user?.id : undefined, values },
      {
        onSuccess: () => {
          message.success(`User account ${user?.is_active ? 'deactivated' : 'activated'} successfully.`);
          refetch();
        },
      },
    );
  };

  // debounce request - mutating after 2000ms, (when not getting any input change from user)
  let flagTimeout: any = null;
  const onFlagChange = (flag: Flag) => {
    const supplierId = singleData?.id;
    if (!supplierId) return;

    const syncFlagReq = () => {
      syncFlags({ supplierId, flagIds: [flag.id] });
    };

    if (flagTimeout) {
      clearTimeout(flagTimeout);
    }

    flagTimeout = setTimeout(syncFlagReq, 500);
  };

  let roleTimeout: any = null;
  const onRoleChange = (roles: Role[]) => {
    const userId = singleData?.people?.user?.id;
    if (!userId) return;

    const roleIds = roles?.map((role) => role.id);

    const syncRoleReq = () => {
      syncRoles({ userId, roleIds });
    };

    if (roleTimeout) {
      clearTimeout(roleTimeout);
    }

    roleTimeout = setTimeout(syncRoleReq, 2000);
  };

  return (
    <CompanyInfoForm
      editMode={editMode}
      isPending={submitPending}
      initialValues={singleData}
      onSubmit={handleFormSubmit}
      rolePending={syncRolePending}
      flagPending={syncFlagPending}
      onDeactivate={handleDeactivate}
      flagChangeHandler={onFlagChange}
      roleChangeHandler={onRoleChange}
      deActivePending={deActivePending}
      refetch={refetch}
    />
  );
};

export default CompanyInfoUpsert;
