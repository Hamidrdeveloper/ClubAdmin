// @ts-nocheck
import PartnerModule from '@modules/Order/Partner.module';
import i18n from '@src/core/i18n/config';
import OrderModule from '@src/modules/Order/Order.module';
import SubscriptionModule from '@src/modules/Order/Subscription.module';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { message } from 'antd';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { QueryObserverResult, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import AdminInfoForm from '../components/AdminInfoForm';
import PersonalInfoForm from '../components/PersonalInfoForm';
import {
  OrderFormCtx,
  OrderPartnerFormCtx,
  SubscriptionFormCtx,
  User,
  UserFormCtx,
  UserPersonalInfoFormModel,
  UserToggler,
} from '../model/personalInfo';
import { createPartner, setUserProfilePic } from '../services/personalInfo.service';
import { toggle2FAService } from '../services/twoFactor.service';
import UserModule from '../User.module';

interface Props extends GlobalUpsertProps<User> {
  editMode: boolean;
  refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
}

interface ProfileMutationProps {
  userId: number;
  fileId: number | null;
}

interface Toggle2FAMutationProps {
  userId: number;
  isChecked: boolean;
}

const PersonalInfoUpsert = ({ editMode, singleData, refetch }: Props): ReactElement => {
  const module = new UserModule();
  const orderModule = new OrderModule();
  const orderPartnerModule = new PartnerModule();
  const subscriptionModule = new SubscriptionModule();
  const navigate = useNavigate();

  const { role } = useParams();

  const { mutate: upsert, isLoading: submitPending } = useMutation(
    ({ id, values }: GlobalMutationProps<UserFormCtx>) => {
      if (!editMode && role === 'partner') {
        return createPartner(values);
      }
      if (editMode && id) {
        return module.apiService.updateOne(id, values);
      } else {
        return module.apiService.createOne(values);
      }
    },
  );

  const { mutate: toggleActivate, isLoading: deActivePending } = useMutation(
    // NOTE: Strip out these section when back-end ready
    ({ id, values }: GlobalMutationProps<UserToggler>) => {
      return module.apiService.request({ url: `/users/${id}/active-status`, body: values, method: 'PUT' });
    },
  );

  const { mutate: setProfilePic } = useMutation(({ userId, fileId }: ProfileMutationProps) => {
    return setUserProfilePic({ userId, fileId });
  });

  const { mutate: newOrder, isLoading: newOrderPending } = useMutation((values: OrderFormCtx) => {
    return orderModule.apiService.createOne(values);
  });

  const { mutate: newSubscption, isLoading: newSubscriptionPending } = useMutation(
    (values: SubscriptionFormCtx) => {
      return subscriptionModule.apiService.createOne(values);
    },
  );

  const { mutate: newOrderParter, isLoading: newOrderPartnerPending } = useMutation(
    (values: OrderPartnerFormCtx) => {
      return orderPartnerModule.apiService.createOne(values);
    },
  );

  const { mutate: toggle2FA, isLoading: twoFactorPending } = useMutation(
    ({ userId, isChecked }: Toggle2FAMutationProps) => {
      return toggle2FAService(userId, isChecked);
    },
  );

  const handleFormSubmit = (formValues: Partial<UserPersonalInfoFormModel>) => {
    const {
      flag,
      customerStep,
      telephone_number,
      roles,
      person,
      sponsor,
      country,
      userType,
      language,
      birth_date,
      paymentTerm,
      paymentMethod,
      shippingMethod,
      ...restValues
    } = formValues;

    const values: Partial<UserFormCtx> = {
      ...restValues,
      people: person,
      telephone_number,
      flag_id: flag?.id,
      country_id: country?.id,
      sponsor_id: sponsor?.id,
      language_id: language?.id,
      user_type_id: userType?.id,
      people_id: singleData?.person?.id,
      customer_step_id: customerStep?.id,
      payment_method_id: paymentMethod?.id,
      default_payment_terms_id: paymentTerm?.id,
      default_shipping_method_id: shippingMethod?.id,
      birth_date: birth_date ? moment(birth_date).format('YYYY-MM-DD') : null,
      roles: roles ? (Array.isArray(roles) ? roles?.map((role) => role.id) : [roles.id]) : [],
    };

    if (values.birth_date && new Date(values.birth_date) >= new Date()) {
      message.error(i18n.t('Global.BirthDateShouldBeLessThanToday'));
      return;
    }

    upsert(
      { id: singleData ? singleData.id : undefined, values },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  };

  const handleDeactivate = () => {
    if (!editMode) return;

    const values: UserToggler = {
      is_active: !singleData?.is_active,
    };
    toggleActivate(
      { id: singleData ? singleData.id : undefined, values },
      {
        onSuccess: () => {
          message.success(
            `User account ${singleData?.is_active ? 'deactivated' : 'activated'} successfully.`,
          );
          refetch();
        },
      },
    );
  };

  const handleProfilePicChange = (fileId: number | null) => {
    const userId = singleData?.id;
    if (!userId) return;

    setProfilePic(
      { userId, fileId },
      {
        onSuccess: () => {
          // if fileId => user wanted to remove its profile pic
          if (fileId === null) {
            message.success(i18n.t('Global.DeletedSuccessfully', { title: 'Profile Picture' }));
          } else {
            message.success('Profile picture has been set');
          }
        },
      },
    );
  };

  const handleNewOrder = () => {
    const userId = singleData?.id;
    if (!userId) return;

    newOrder(
      { user_id: userId },
      {
        onSuccess: (data) => {
          const orderId = data.id;
          navigate(`/admin/orders/order-sale/${orderId}`, { replace: true });
        },
      },
    );
  };

  const handleNewSubscription = () => {
    const userId = singleData?.id;
    if (!userId) return;

    if (singleData?.invoice_contact_group_id) {
      newSubscption(
        { user_id: userId, invoice_contact_group_id: singleData.invoice_contact_group_id },
        {
          onSuccess: (data) => {
            const subId = data.id;
            navigate(`/admin/orders/subscription/${subId}`, { replace: true });
          },
        },
      );
    } else {
      message.error('User has not Invoice Contact Group');
    }
  };

  const handleNewOrderPartner = () => {
    const userId = singleData?.id;
    if (!userId) return;

    if (singleData?.invoice_contact_group_id) {
      newOrderParter(
        { customer_id: userId, partner_id: singleData.sponsor.id },
        {
          onSuccess: (data) => {
            const subId = data.id;
            navigate(`/admin/orders/partner/${subId}`, { replace: true });
          },
        },
      );
    } else {
      message.error('User has not Invoice Contact Group');
    }
  };

  const twoFactorToggleHandler = (isChecked: boolean) => {
    const userId = singleData?.id;
    if (!userId) return;

    toggle2FA(
      { userId, isChecked },
      {
        onSuccess: () => {
          message.success(
            i18n.t('User.Field.TwoFactorAuthenticationSuccessfully', {
              title: isChecked ? i18n.t('User.Field.Enabled') : i18n.t('User.Field.Disabled'),
            }),
          );
        },
      },
    );
  };

  return (
    <>
      {role === 'admin' || role === 'employee' ? (
        <AdminInfoForm
          editMode={editMode}
          isPending={submitPending}
          initialValues={singleData}
          onSubmit={handleFormSubmit}
          onNewOrder={handleNewOrder}
          onDeactivate={handleDeactivate}
          deActivePending={deActivePending}
          newOrderPending={newOrderPending}
          twoFactorPending={twoFactorPending}
          onProfilePicChange={handleProfilePicChange}
          twoFactorToggleHandler={twoFactorToggleHandler}
        />
      ) : (
        <PersonalInfoForm
          editMode={editMode}
          isPending={submitPending}
          initialValues={singleData}
          onSubmit={handleFormSubmit}
          onNewOrder={handleNewOrder}
          onDeactivate={handleDeactivate}
          onNewSubscription={handleNewSubscription}
          onNewOrderPartner={handleNewOrderPartner}
          newOrderPending={newOrderPending}
          newOrderPartnerPending={newOrderPartnerPending}
          deActivePending={deActivePending}
          twoFactorPending={twoFactorPending}
          newSubscriptionPending={newSubscriptionPending}
          onProfilePicChange={handleProfilePicChange}
          twoFactorToggleHandler={twoFactorToggleHandler}
        />
      )}
    </>
  );
};

export default PersonalInfoUpsert;
