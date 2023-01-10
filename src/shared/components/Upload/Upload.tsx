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
import { UploadOutlined } from '@ant-design/icons';
import Env from '@config/ConfigureEnv';
import { AuthContext } from '@src/core/Authentication';
import { Button, Spin, Upload } from 'antd';
import { UploadProps as AntUploadProps, RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UploadProps } from './upload.entity';
import Styles from './Upload.style';

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
  idName = 'file_id',
  pathName = 'file_path',
}: UploadProps): ReactElement => {
  const { t } = useTranslation();
  const { token } = useContext(AuthContext);
  const [preview, setPreview] = useState<string>();
  const [pending, setPending] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    console.log('==============value======================');
    console.log(value);
    console.log('==============value======================');
    if (value && typeof value === 'string') {
      setPreview( value);
      setFileList([{ uid: 'id', status: 'done', name: 'Uploaded File', url: value }]);
    } else {
      setFileList([]);
      setPreview(undefined);
    }
  }, [value]);

  const handleChange = async (info) => {
      console.log('============info========================');
      console.log(info);
      console.log('==============info======================');
      setFileList([]);
      setPending(false);
   
    
      const {translate} = form.getFieldsValue()
 if(translate) {
  const updatedProjects = translate.map(project => {
  
      return {
        ...project,
        file_patch: info.file
      }
  })
  form.setFieldsValue({ translate: updatedProjects })
}else{
  
form.setFieldsValue({ file: info.file })
}
      
   
    setPending(true);
    setFileList([ info.file]);
    setPreview(await getBase64( info.file as RcFile));

    
 
}

  const uploadProps: AntUploadProps = {
    maxCount: 1,
    name: 'file',
    fileList: fileList,
    action: Env.UPLOAD_URL,
    onChange: handleChange,
   
  };

  return type === 'normal' ? (
    <Upload beforeUpload={()=> {
      /* update state here */
      return false; }}{...uploadProps} listType="picture" disabled={disabled}>
      <Button block icon={<UploadOutlined />}>
        {t('Global.UploadFile')}
      </Button>
    </Upload>
  ) : (
    <Upload.Dragger showUploadList={false} {...uploadProps} disabled={disabled}>
      {fileList.length === 0 ? (
        <div style={{ padding: '9px 0' }}>
          {!disabled && (
            <>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Drag File To Upload</p>
            </>
          )}
        </div>
      ) : (
        <Styles.ImagePreview>
          {pending ? <Spin /> : fileList.map((_, index) => <img key={`image-${index}`} src={preview} />)}
        </Styles.ImagePreview>
      )}
    </Upload.Dragger>
  );
};

export default CustomUpload;
