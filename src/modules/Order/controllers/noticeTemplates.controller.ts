import { EmailTemplates } from '@src/modules/Email/model/email.entity';
import { PaginationRequest, ResponseMeta } from '@src/shared/models';

import { getAllTemplates } from '../services/noticeTemplate.service';

export const getAllTemplatesForEmailTab = async (query: {
  pagination: PaginationRequest;
  locale: string;
}): Promise<[EmailTemplates[], ResponseMeta]> => await getAllTemplates(query);
