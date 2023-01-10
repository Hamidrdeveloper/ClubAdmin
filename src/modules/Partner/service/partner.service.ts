import { Env } from '@src/core';
import { User } from '@src/modules/User';
import axios, { AxiosResponse } from 'axios';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

import { Partner } from '../model/partner.entity';
import { PartnerTree, SinglePartnerTree } from '../model/partnerTree.entity';

const normalizePartnerTree = (partner: PartnerTree): RawNodeDatum => {
  return {
    name: partner.person?.full_name,
    attributes: {
      id: partner.user_id,
      email: partner.email,
      active: partner.is_active,
      coach: partner.coach_full_name,
      level: partner.career_step_name,
      sponsor: partner.sponsor_full_name,
      avatar: partner.avatar ? Env.PURE_URL + partner.avatar : '/assets/images/global/avatar.png',
    },
    children: partner.children.map(normalizePartnerTree),
  };
};

const getSinglePartnerTree = (partner: PartnerTree): SinglePartnerTree => {
  return {
    id: partner.id,
    email: partner.email,
    userId: partner.user_id,
    active: partner.is_active,
    level: partner.career_step_name,
    fullName: partner.person?.full_name,
    coachFullName: partner.coach_full_name,
    sponsorFullName: partner.sponsor_full_name,
    children: partner.children.map(getSinglePartnerTree),
    avatar: partner.avatar ? Env.PURE_URL + partner.avatar : '/assets/images/global/avatar.png',
  };
};

export const getUserDescendants = async ({
  depth,
  partnerId,
}: {
  depth: number;
  partnerId: number;
}): Promise<{ fullData: RawNodeDatum; singleData: SinglePartnerTree }> => {
  try {
    const response: AxiosResponse<PartnerTree> = await axios.request({
      method: 'get',
      params: { depth },
      url: `/partners/descendants/${partnerId}`,
    });

    return { fullData: normalizePartnerTree(response.data), singleData: getSinglePartnerTree(response.data) };
  } catch (e) {
    throw new Error(e);
  }
};

export const getPartnerUserInfo = async (userId: number): Promise<User> => {
  try {
    const response: AxiosResponse<{ data: User }> = await axios.get(`/users/${userId}`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getPartnerRanking = async (): Promise<Partner[]> => {
  try {
    const response: AxiosResponse<{ data: Partner[] }> = await axios.get(`/partners?page=1&per_page=5`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
