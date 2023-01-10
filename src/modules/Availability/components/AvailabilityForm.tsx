/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FormSubmit, NameArrayInput, Upload } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, TimePicker, Tooltip } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Availability } from '../model/Availability.entity';
import { RoleSelect } from '@src/modules/Role';
import ReferrerSelect from '@src/modules/Referrer/containers/ReferrerSelect';
import Styles from './styles';
import { BulbFilled, MobileFilled, SearchOutlined } from '@ant-design/icons';
import { useLocation ,useNavigate} from 'react-router-dom';
import CompanySelect from '@src/modules/Company/container/CompanySelect';
import CurrencySelect from '@src/modules/Currency/containers/CurrencySelect';
import CountrySelect from '@src/modules/Country/containers/CountrySelect';
import { ApiBuilder } from '@src/shared/utils';
import i18n from '@src/core/i18n/config';
import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { FlagSelect } from '@src/modules/Flag';

const AvailabilityForm = ({ onSubmit, initialValues, isPending ,onChange}: FormProps<Availability>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [timing, setTiming] = useState([])
  useEffect(() => {
    if (initialValues?.duration_MSC) {
      console.log(initialValues);
      setTiming([...Array(initialValues.duration_MSC/1000).keys()])
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  const onBlur = (value) => {
     
        const seconds = Math.max(0, getSecondsFromHHMMSS(value));
    
       const time = toHHMMSS(seconds);
       return time;
      };

      const getSecondsFromHHMMSS = (value) => {
        const [str1, str2, str3] = value.split(":");
    
        const val1 = Number(str1);
        const val2 = Number(str2);
        const val3 = Number(str3);
    
        if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
        // seconds
          return val1;
        }
    
        if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
        // minutes * 60 + seconds
          return val1 * 60 + val2;
        }
    
        if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
        // hours * 60 * 60 + minutes * 60 + seconds
          return val1 * 60 * 60 + val2 * 60 + val3;
        }
    
        return 0;
      };
      const toHHMMSS = (secs) => {
        const secNum = parseInt(secs.toString(), 10);
        const hours = Math.floor(secNum / 3600);
        const minutes = Math.floor(secNum / 60) % 60;
        const seconds = secNum % 60;
        if(hours<2){
       
    
        return [hours, minutes, seconds]
          .map((val) => (val < 10 ? `0${val}` : val))
          .filter((val, index) => val !== "00" || index > 0)
          .join(":")
          .replace(/^0/, "");
        }else{
          return [1, minutes, seconds]
          .map((val) => (val < 10 ? `0${val}` : val))
          .filter((val, index) => val !== "00" || index > 0)
          .join(":")
          .replace(/^0/, "");
        }
    };
    
  return (
    <Form
      form={form}
      layout={'vertical'}
      name="availability-form"
      onFinish={onSubmit}
      initialValues={{  }}
    >
     
      {/* <Row justify="space-between" gutter={16}>
        <Col span={24}>
          <Form.Item required>
            <NameArrayInput />
          </Form.Item>
        </Col>
      </Row> */}
  
      <Row justify="space-between" gutter={16}>
        <Col span={12}>
          <Form.Item
            label={"Title"}
            name="title"
            rules={[{ required: true }]}
          >
            <Input
             
              placeholder={"Title"}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Point"}
            name="point"
            rules={[{ required: true }]}
          >
            <InputNumber
             
              placeholder={"Point"}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
                <Form.Item label={"Type"} name="chantTypeId" rules={[{ required: true }]}>
                  <ReferrerSelect  />
                </Form.Item>
              </Col>
              <Col span={12}>
          <Form.Item
            label={"Duration_MSC"}
            name="duration_MSC"
            valuePropName='date'
            rules={[{ required: true }]}
          >
            <TimePicker  
           format={"mm:ss"}

              placeholder={"Duration_MSC"}
            />
          </Form.Item>
        </Col>
        <Col xs={12} style={{ alignSelf: 'end' }}>
        <Form.Item name="isActive" valuePropName="checked">
                <Checkbox >{"Is Active"}</Checkbox>
              </Form.Item>
        </Col>
        <div  style={{ overflowX: 'scroll' }}>
              {initialValues?.duration_MSC?
              <Col span={24}>
                <Styles.MainDiv >
                <Col span={240}>
                <Row  gutter={0} >
                <Col span={3} >
                <label htmlFor="message">Timing:</label>

                 </Col>
                 <Col span={21}>
                <div className={"timing"} style={{width:timing.length*60}}>
                <Row justify="space-between"  gutter={12} >
                { timing.map(res =>{
                  
                  return(
                    <Col style={{paddingRight:30}}>
                    <div>
                    <label htmlFor="message">{res}</label>
                    </div>
                    </Col>
                  )
                })
                }
                 </Row>
                 <Divider />
                 </div>
                 </Col>
                 </Row>
                </Col>
                <Row justify="space-between" style={{rowGap:24}}  gutter={24}>
                <Col span={24}>
                <Row className='ant-row-box' style={{rowGap:24}}  gutter={24}>
                <Col span={2}>
                <label htmlFor="message">lyric:</label>

                 </Col>
                 <Col span={1}>
          
                 <CompanySelect
                   value={initialValues.id}
                 onChange={()=>onChange()}/>
               
                 </Col>
                <Col span={21}>
                 <div className='FirstBorder' style={{width:timing.length*60}}>
                  {initialValues.chant_Lyric_List.map(res =>{
                    return (<div className="ant-row-box-text" key={res.id}>
                      <label className="label-text" maxlength="30"> 
                      {res.lyric_Sentence.substring(0,20)+"..."}
                      </label>
                      </div>)
                  })}
                 </div>
                 </Col>
               
                 </Row>
                 </Col>
                 <Col span={24}>
                 <Row className='ant-row-box' style={{rowGap:24}}  gutter={24}>
                <Col span={2}>
                <label htmlFor="message">Vibrate:</label>

                 </Col>
                 <Col span={1}>
          
                <CountrySelect   value={initialValues.id} onChange={()=>onChange()}/>
     
                 </Col>
                <Col span={21}>
                <div className='TwoBorder' style={{width:timing.length*60}}>
                {initialValues.chant_Vibrate_List.map(res =>{
                    return (<div className="vibrate" key={res.id}>
                    
                      <MobileFilled style={{ fontSize: '25px' ,color: '#fff'}}/>
                    
                      </div>)
                  })}
                </div>
                 </Col>
               
                 </Row>
                 </Col>
                 <Col span={24}>
                 <Row className='ant-row-box' style={{rowGap:24}}  gutter={24}>
                <Col span={2}>
                <label htmlFor="message">Light:</label>

                 </Col>
                 <Col span={1}>
          
                 <CurrencySelect   value={initialValues.id}  onChange={()=>onChange()}/>
     
                 </Col>
                <Col span={21}>
                <div className='ThreeBorder' style={{width:timing.length*60}} >
                {initialValues.chant_Light_List.map(res =>{
                    return (<div className="Light" key={res.id}>
             
                      <BulbFilled style={{ fontSize: '25px' ,color: '#fff'}}/>
                     
                      </div>)
                  })}
                </div>
                 </Col>
               
                 </Row>
                 </Col>
                 <Col span={24}>
                 <Row className='ant-row-box' style={{rowGap:24}}  gutter={24}>
                <Col span={2}>
                <label htmlFor="message">Audio:</label>

                 </Col>
                 <Col span={1}>
          
                 <FlagSelect value={initialValues.id}  onChange={()=>onChange()}/>
     
                 </Col>
                <Col span={21}>
                <div className='FourBorder' style={{width:timing.length*60}}>
                {initialValues.chant_Audio_List.length>0?timing.map(res =>{
                    return (  <img style={{height:50}}src='../../../assets/images/global/eqlizer.png'/>)
                  }):null}
              
                </div>
                 </Col>
               
                 </Row>
                 </Col>
                 
                 </Row>
                </Styles.MainDiv>
              </Col>
              
              :null}
              <div  style={{ height:50}}></div>
                  </div>
      </Row>
  
      <FormSubmit isPending={isPending} />
   
    </Form>
  );
};

export default AvailabilityForm;
