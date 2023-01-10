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
// @ts-nocheck
import { UploadOutlined } from '@ant-design/icons';
import Env from '@config/ConfigureEnv';
import { AuthContext } from '@src/core/Authentication';
import { Button, Col, Form, Input, Row, Spin } from 'antd';
import { UploadProps as AntUploadProps, RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload } from '..';

import { UploadProps } from './uploadLabel.entity';
import Styles from './UploadLabel.style';

function getBase64(file: RcFile): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const CustomUpload = ({
  value,
  form,
  disabled,
  valueName,
  requestHeaders,
  type = 'normal',
  nameKey="",
  idName = 'file',
  pathName = 'file_path',
}: UploadProps): ReactElement => {
  const { t } = useTranslation();
  const { token } = useContext(AuthContext);
  const [preview, setPreview] = useState<string>();
  const [pending, setPending] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreview(Env.PURE_URL + value);
      setFileList([{ uid: 'id', status: 'done', name: 'Uploaded File', url: Env.PURE_URL + value }]);
    } else {
      setFileList([]);
      setPreview(undefined);
    }
  }, [value]);

  const handleChange = async (data: UploadChangeParam) => {
    if (data.file.status === 'removed') {
      setFileList([]);
      setPending(false);
      if (typeof idName === 'string') {
        form.setFieldsValue({ [idName]: null });
      }

      if (valueName) {
        form.setFieldsValue({ [valueName]: null });
      }
      return;
    }

    setPending(true);
    setFileList([data.file]);
    setPreview(await getBase64(data.file.originFileObj as RcFile));

    if (data.file.response && data.file.percent === 100) {
      setPending(false);
      if (valueName) {
        form.setFieldsValue({ [valueName]: data.file.response.data.root_file.path });
      }
      if (typeof idName === 'string') {
        form.setFieldsValue({
          [pathName]: data?.file?.response?.data?.root_file?.path,
          [idName]: data.file.response.data.id,
        });
      } else if (Array.isArray(idName)) {
        const fields = form.getFieldsValue();
        const values = fields[idName[0]];
        Object.assign(values[idName[1]], { [idName[2]]: data.file.response.data.id });
        form.setFieldsValue(fields);
      }
    }
  };

  const uploadProps: AntUploadProps = {
    maxCount: 1,
    name: 'file',
    fileList: fileList,
    action: Env.UPLOAD_URL,
    onChange: handleChange,
    headers: { Authorization: `Bearer ${token}`, ...requestHeaders },
  };

  return  (
    <>
     <Row gutter={24}>
     <Col span={16}>
          <Form.Item label={t('ProductCategory.Field.Parent')} name={[nameKey, "label"]}>
          <Input
              placeholder={t('Global.InputPlaceholder', { title: t('ProductCategory.Field.Order') })}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item  name={[nameKey, "file"]} label={t('Availability.Field.File')}>
            <Upload form={form} idName="file_id" key={'file'} />
          </Form.Item>        </Col>
        
        </Row>
    </>
  );
};

export default CustomUpload;
