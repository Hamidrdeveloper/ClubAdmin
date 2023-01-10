// @ts-nocheck
import React, { ReactElement } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { MainContainer } from './ActionButton.style';
import { MinusCircleOutlined } from '@ant-design/icons';

export default function ActionButton():ReactElement  {
    return(
      <MainContainer>
  <Space className="site-button-ghost-wrapper" wrap>
    <Row gutter={[24, 0]}>
   
    <Col xs={12}>
    
    <Button size={30} type="primary" ghost>
      Action
    </Button>
    </Col>
    <Col xs={12}>
    <div className="site-button-ghos">
    <Button  type="primary" icon={<MinusCircleOutlined />} ghost style={{whiteSpace: "normal",marginBottom:'10px',width:40,}}>
    </Button>
    </div> 
    </Col>
    </Row>
  </Space>
  </MainContainer>
);
}
