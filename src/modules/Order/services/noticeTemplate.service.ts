import { EmailTemplates } from '@src/modules/Email/model/email.entity';
import { PaginationRequest, ResponseMeta } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

const API = new ApiBuilder<EmailTemplates>('/notice-template');

export const getAllTemplates = async ({
  locale,
  pagination,
}: {
  pagination: PaginationRequest;
  locale: string;
}): Promise<[EmailTemplates[], ResponseMeta]> => {
  try {
    const result = await await API.getAll({
      pagination,
      params: { locale },
    });
    return [result.data, result.meta];
  } catch (e) {
    throw new Error(e);
  }
};
