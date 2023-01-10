import { Col, Row } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import AutomaticSelect from '../components/AutomaticSelect';
import { Automatic } from '../model/email.entity';
import { updateAutomatics } from '../services/email.service';

interface UpsertProps {
  data: Automatic[];
}

type UpdateProps = { notice_template_id: number; id: number };

const AutomaticUpsert: React.FC<UpsertProps> = ({ data }) => {
  const { mutate } = useMutation((values: UpdateProps) => updateAutomatics(values));

  return (
    <Container>
      <Row gutter={32}>
        {data.map((automatic) => (
          <Col xs={24} xl={12} className="automatic">
            <div className="single" key={automatic.id}>
              <AutomaticSelect automatic={automatic} onChange={mutate} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AutomaticUpsert;

const Container = styled.div`
  padding: 32px;
  min-height: 600px;

  & .automatic {
    & .single {
      padding: 8px;

      :nth-child(even) {
        background-color: #f4f6f9;
      }
      :nth-child(odd) {
        background-color: #e5e7e9;
      }
    }
  }
`;
