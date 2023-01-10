import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { AvatarRender } from './components/TableComponents';
import { Comment } from './model/comment.entity';
import moduleInfo from './ModuleInfo.json';

export default class CommentModule implements FactoryModule<Comment> {
  public entity = '/comments';
  public title = [i18n.t('Comment.Title'), i18n.t('Comment.Title', { count: 2 })];
  public apiService = new ApiBuilder<Comment>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin/${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'product_dimension_id',
      label: i18n.t('Comment.List.Table.ProductVariation'),
    },
    {
      key: ['user', 'username'],
      label: i18n.t('Comment.List.Table.UserProfile'),
    },
    {
      key: 'description',
      label: i18n.t('Comment.List.Table.Comment'),
    },
  ];

  public tableColumns = [
    {
      width: 150,
      key: 'product_variation_id',
      dataIndex: 'product_variation_id',
      title: i18n.t('Comment.List.Table.ProductVariation'),
    },
    {
      width: 250,
      key: 'user',
      dataIndex: 'user',
      render: AvatarRender,
      title: i18n.t('Comment.List.Table.UserProfile'),
    },
    {
      width: 150,
      key: 'description',
      dataIndex: 'description',
      title: i18n.t('Comment.List.Table.Comment'),
    },
  ];

  public PriceIntervalTypes: { label: string; value: string }[] = [
    { label: 'None', value: 'none' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Half-Year', value: 'half-year' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'weekly' },
    { label: 'Daily', value: 'daily' },
  ];
}
