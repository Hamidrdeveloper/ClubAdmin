import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { ReactNode, lazy } from 'react';

import {
  BillTableDownloadBtnRenderer,
  BillTablePreviewComponent,
  BillTableRegenerateBtnRenderer,
  BillsTableConditionComponent,
  BillsTableContactGroupComponent,
  BillsTableCountryComponent,
  BillsTableCurrencyComponent,
  BillsTableDateComponent,
  BillsTableLinkComponent,
  BillsTablePaymentMethodComponent,
  BillsTablePercentComponent,
  BillsTableUserComponent,
  NavigateToPartnerRenderer,
  NavigateToUserRenderer,
  NullRenderer,
} from './components/BillsDescTableInfo';
import {
  BillTableDateComponent,
  BillTableIsApprovedComponent,
  IsPaidRenderer,
} from './components/BillsTableInfo';
import { ABill, Bill } from './model/bill.entity';
import ModuleInfo from './ModuleInfo.json';

export class ABillModule implements FactoryModule<ABill> {
  public entity = '/abills';
  public title = [i18n.t('SidePanel.Bills'), i18n.t('SidePanel.Bills', { count: 2 })];
  public apiService = new ApiBuilder<ABill>('/abills', 'ABills');

  public UpsertComponent = lazy(() => import('./container/ABill.create'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns;

  public tableColumns: TableColumnsType = [
    {
      key: 'name',
      dataIndex: 'name',
      title: i18n.t('Global.Name'),
      width: 400,
    },
    {
      key: 'from',
      dataIndex: 'from',
      title: i18n.t('Global.From'),
      render: BillTableDateComponent,
    },
    {
      key: 'to',
      dataIndex: 'to',
      title: i18n.t('Global.To'),
      render: BillTableDateComponent,
    },
    {
      key: 'hidden',
      dataIndex: 'hidden',
      title: i18n.t('Bill.Field.Hidden'),
      render: BillsTableConditionComponent,
    },
    {
      key: 'bill_number_generated',
      dataIndex: 'bill_number_generated',
      title: i18n.t('Bill.Field.BillNumberGenerated'),
      width: 200,
    },
    {
      key: 'promotion_executed',
      dataIndex: 'promotion_executed',
      title: i18n.t('Bill.Field.PromotionExecuted'),
    },
    {
      key: 'created_at',
      dataIndex: 'created_at',
      title: i18n.t('Global.CreatedAt'),
      render: BillTableDateComponent,
    },
    {
      key: 'update_at',
      dataIndex: 'updated_at',
      title: i18n.t('Global.UpdatedAt'),
      render: BillTableDateComponent,
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Global.IsApproved'),
      render: (id: number, data: Bill): ReactNode => BillTableIsApprovedComponent(data),
      align: 'center',
    },
  ];
}

export class BillModule implements FactoryModule<Bill> {
  public entity = '/bills';
  public title = [i18n.t('Bill.Title'), i18n.t('Bill.Title', { count: 2 })];
  public apiService = new ApiBuilder<Bill>('/bills', 'Bills');
  public UpsertComponent;
  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];
  public detailColumns;

  public tableColumns: TableColumnsType = [
    {
      width: 100,
      key: 'user',
      dataIndex: 'user',
      title: i18n.t('Global.UserId'),
      render: NavigateToUserRenderer,
    },
    {
      key: 'user',
      dataIndex: 'user',
      className: 'number',
      render: NavigateToPartnerRenderer,
      title: i18n.t('Bill.Field.PartnerId'),
    },
    {
      render: NullRenderer,
      key: 'calculation_career_step_name',
      dataIndex: ['calculationCareerStep', 'name'],
      title: i18n.t('Bill.Field.CalculationCareerStep'),
    },
    {
      width: 200,
      render: NullRenderer,
      key: 'current_career_step',
      title: i18n.t('Bill.Field.CareerStep'),
      dataIndex: ['currentCareerStep', 'name'],
    },
    {
      render: NullRenderer,
      key: 'next_career_step',
      dataIndex: ['nextCareerStep', 'name'],
      title: i18n.t('Bill.Field.NextCareerStep'),
    },
    {
      width: 200,
      dataIndex: 'user',
      title: i18n.t('Global.User'),
      key: 'full_name_company_name',
      render: BillsTableUserComponent,
    },
    {
      key: 'country',
      dataIndex: 'country',
      title: i18n.t('Global.Country'),
      render: BillsTableCountryComponent,
    },
    {
      key: 'number',
      dataIndex: 'number',
      title: i18n.t('Global.Number'),
    },
    {
      key: 'pay_date',
      dataIndex: 'pay_date',
      title: i18n.t('Bill.Field.PayDate'),
      render: BillsTableDateComponent,
    },
    {
      key: 'total_amount',
      dataIndex: 'total_amount',
      title: i18n.t('Global.TotalAmount'),
      render: BillsTableCurrencyComponent,
    },
    {
      key: 'gen_1_point',
      render: NullRenderer,
      dataIndex: 'gen_1_point',
      title: i18n.t('Bill.Field.Gen1Point'),
    },
    {
      render: NullRenderer,
      key: 'gen_1_to_4_point',
      dataIndex: 'gen_1_to_4_point',
      title: i18n.t('Bill.Field.1to4GenPoint'),
    },
    {
      key: 'point',
      dataIndex: 'point',
      render: NullRenderer,
      title: i18n.t('Global.Point'),
    },
    {
      key: 'group_point',
      render: NullRenderer,
      dataIndex: 'group_point',
      title: i18n.t('Bill.Field.GroupPoint'),
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Bill.Field.Preview'),
      render: BillTablePreviewComponent,
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Global.Download'),
      render: BillTableDownloadBtnRenderer,
    },
    {
      key: 'regenerate_button',
      title: i18n.t('Bill.Field.Regenerate'),
      render: BillTableRegenerateBtnRenderer,
    },
    {
      key: 'is_paid',
      align: 'center',
      dataIndex: 'is_paid',
      render: IsPaidRenderer,
      title: i18n.t('Global.IsPaid'),
    },
  ];

  constructor(abillId: number, countryId?: number[], partnerId?: number) {
    if (partnerId) {
      this.apiService = new ApiBuilder<Bill>(`/bills?userId=${partnerId}`, 'Bills');
    } else {
      if (countryId) {
        let url = `/bills?abillId=${abillId}`;
        countryId.forEach((item) => {
          url += `&countryIds[]=${item}`;
        });

        this.apiService = new ApiBuilder<Bill>(url, 'Bills');
      } else this.apiService = new ApiBuilder<Bill>('/bills?abillId=' + abillId, 'Bills');
    }
  }
}

export class PartnerBillModule implements FactoryModule<Bill> {
  public entity = '/bills';
  public title = [i18n.t('Bill.Title'), i18n.t('Bill.Title', { count: 2 })];
  public apiService = new ApiBuilder<Bill>('/bills', 'Bills');
  public UpsertComponent;
  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];
  public detailColumns;
  public tableColumns = [
    {
      key: 'id',
      dataIndex: ['id', 'abill_id'],
      title: i18n.t('Global.ID'),
      render: (_: number, allData: Bill): ReactNode => BillsTableLinkComponent(allData),
      width: 200,
    },
    {
      width: 100,
      key: 'user',
      dataIndex: 'user',
      title: i18n.t('Global.UserId'),
      render: NavigateToUserRenderer,
    },
    {
      width: 200,
      key: 'career_step',
      render: NullRenderer,
      title: i18n.t('Bill.Field.CareerStep'),
      dataIndex: ['currentCareerStep', 'name'],
    },
    {
      width: 200,
      key: 'contactGroup',
      dataIndex: 'contactGroup',
      title: i18n.t('Global.ContactGroup'),
      render: BillsTableContactGroupComponent,
    },
    {
      key: 'country',
      dataIndex: 'country',
      title: i18n.t('Global.Country'),
      render: BillsTableCountryComponent,
    },
    {
      key: 'factor',
      dataIndex: 'factor',
      title: i18n.t('Bill.Field.Factor'),
      width: 50,
    },
    {
      key: 'gender',
      dataIndex: 'gender',
      title: i18n.t('Global.Gender'),
    },
    {
      key: 'iban',
      dataIndex: 'iban',
      title: i18n.t('Bill.Field.IBAN'),
    },
    {
      key: 'is_paid',
      dataIndex: 'is_paid',
      title: i18n.t('Global.IsPaid'),
      render: BillsTableConditionComponent,
      width: 70,
    },
    {
      key: 'number',
      dataIndex: 'number',
      title: i18n.t('Global.Number'),
    },
    {
      key: 'pay_date',
      dataIndex: 'pay_date',
      title: i18n.t('Bill.Field.PayDate'),
      render: BillsTableDateComponent,
    },
    {
      key: 'payment_method',
      dataIndex: 'paymentMethod',
      title: i18n.t('Bill.Field.PaymentMethod'),
      render: BillsTablePaymentMethodComponent,
    },
    {
      key: 'swift',
      dataIndex: 'swift',
      title: i18n.t('Bill.Field.Swift'),
    },
    {
      key: 'tax_number',
      dataIndex: 'tax_number',
      title: i18n.t('Bill.Field.TaxNumber'),
    },
    {
      key: 'total_amount',
      dataIndex: 'total_amount',
      title: i18n.t('Global.TotalAmount'),
      render: BillsTableCurrencyComponent,
    },
    {
      key: 'user',
      dataIndex: 'user',
      title: i18n.t('Global.User'),
      render: BillsTableUserComponent,
      width: 200,
    },

    {
      key: 'vat',
      dataIndex: 'vat',
      title: i18n.t('Bill.Field.Vat'),
      render: BillsTableCurrencyComponent,
    },
    {
      key: 'vat_percent',
      dataIndex: 'vat_percent',
      title: i18n.t('Bill.Field.VatPercent'),
      render: BillsTablePercentComponent,
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Bill.Field.Preview'),
      render: BillTablePreviewComponent,
    },
  ];

  constructor(partnerId: number | undefined) {
    this.apiService = new ApiBuilder<Bill>(`/bills?userId=${partnerId}`, 'Bills');
  }
}
