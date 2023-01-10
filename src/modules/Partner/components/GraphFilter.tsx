import { FilterOutlined } from '@ant-design/icons';
import { Form, Select, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type Props = { treeType: string; onChangeTreeType: (value: string) => void };
const GraphFilter: React.FC<Props> = ({ treeType = 'graph', onChangeTreeType }) => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Typography.Text className="title">
        <FilterOutlined /> {t('Global.Filter')}:
      </Typography.Text>
      <Form layout="inline">
        {/* <Form.Item label="User Type">
          <Select placeholder="Select User Type">
            <Select.Option value={'Partner'}>Partner</Select.Option>
          </Select>
        </Form.Item> */}

        <Form.Item label={t('Global.OverviewType')}>
          <Select
            value={treeType}
            style={{ width: 120 }}
            onChange={onChangeTreeType}
            placeholder={t('Partner.Field.SelectTreeType')}
          >
            <Select.Option value={'graph'}>{t('Partner.Field.Graphic')}</Select.Option>
            <Select.Option value={'list'}>{t('Partner.Field.ListView')}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </MainContainer>
  );
};

export default GraphFilter;

const MainContainer = styled.div`
  display: flex;
  align-items: center;

  & .title {
    margin-right: 16px;
  }
`;
