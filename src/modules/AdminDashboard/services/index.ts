import { CompetitionModel } from '@modules/Competition/model/Competition.entity';
import { Inventory } from '@modules/Stock/model/inventory';
import { PaginationRequest } from '@shared/models';
import { ResponseContext } from '@shared/models';
import { ApiBuilder } from '@shared/utils';
import { Partner } from '@src/modules/Partner';
import { Subdomain } from '@src/modules/Subdomain/model/Subdomain.entity';

import { OrderAdminDashboard } from '../model/OrderAdmin.entity';
import { RangeDateProps } from '../pages/AdminDashboard';

export async function getSubdomains(
  pagination: PaginationRequest,
  isApproved: boolean,
): Promise<ResponseContext<Subdomain[]>> {
  const SubdomainAPI = new ApiBuilder<Subdomain>('subdomains');
  try {
    return await SubdomainAPI.getAll({
      pagination: pagination,
      params: { isApproved: isApproved },
      orderBy: { id: 'ASC' },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUpdatedSubdomains(
  pagination: PaginationRequest,
  isApproved: boolean,
  rangeDate: RangeDateProps,
): Promise<ResponseContext<Subdomain[]>> {
  const SubdomainAPI = new ApiBuilder<Subdomain>('subdomains');
  try {
    return await SubdomainAPI.getAll({
      pagination: pagination,
      params: {
        isApproved: isApproved,
        startUpdatedAt: rangeDate.from_date,
        endUpdatedAt: rangeDate.to_date,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function getPartners(pagination: PaginationRequest): Promise<ResponseContext<Partner[]>> {
  const PartnersAPI = new ApiBuilder<Partner>('partners');
  try {
    return await PartnersAPI.getAll({
      pagination: pagination,
      params: { isApproved: false },
      orderBy: { id: 'ASC' },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUpdatedPartners(
  pagination: PaginationRequest,
  isApproved: boolean,
  rangeDate: RangeDateProps,
): Promise<ResponseContext<Partner[]>> {
  const PartnersAPI = new ApiBuilder<Partner>('partners');
  try {
    return await PartnersAPI.getAll({
      pagination: pagination,
      params: { isApproved: false, startUpdatedAt: rangeDate.from_date, endUpdatedAt: rangeDate.to_date },
      orderBy: { id: 'ASC' },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function getOrderCards(rangeDate: RangeDateProps): Promise<OrderAdminDashboard> {
  const OrderAPI = new ApiBuilder<OrderAdminDashboard>('admin-dashboard/orders');
  try {
    return await OrderAPI.getSingle({
      params: { from_date: rangeDate.from_date, to_date: rangeDate.to_date },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function getProductInventories(
  pagination: PaginationRequest,
): Promise<ResponseContext<Inventory[]>> {
  const ProductsAPI = new ApiBuilder<Inventory>('inventories');
  try {
    return await ProductsAPI.getAll({
      pagination: pagination,
      params: {
        quantityLessThanMinimum: true,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function getCompetitions(
  pagination: PaginationRequest,
  isActive: boolean,
): Promise<ResponseContext<CompetitionModel[]>> {
  const CompetitionAPI = new ApiBuilder<CompetitionModel>('competitions');
  try {
    return await CompetitionAPI.getAll({
      pagination: pagination,
      params: { isActive: isActive },
      orderBy: { id: 'ASC' },
    });
  } catch (e) {
    throw new Error(e);
  }
}
