import { DeleteOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import Env from '@config/ConfigureEnv';
import { AuthContext } from '@src/core';
import { Avatar, Button, FormInstance, Upload, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

// TODO: if its pending: dont let us submit the form
const UploadAvatar = ({
  form,
  value,
  onChange,
  idName = 'file_id',
}: {
  value?: string;
  idName?: string;
  form: FormInstance;
  onChange: (fileId: number | null) => void;
}): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [preview, setPreview] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreview(Env.PURE_URL + value);
      setFileList([{ uid: 'id', status: 'done', name: 'Uploaded File', url: Env.PURE_URL + value }]);
    }
  }, [value]);

  const handleChange = async (data: UploadChangeParam) => {
    if (data.file.status === 'removed') {
      setFileList([]);
      setIsLoading(false);
      if (typeof idName === 'string') {
        form.setFieldsValue({ [idName]: null });
      }
      return;
    }

    setIsLoading(true);
    setFileList([data.file]);
    setPreview(await getBase64(data.file.originFileObj as RcFile));

    if (data.file.response && data.file.percent === 100) {
      setIsLoading(false);

      const fileId = data.file.response.data.id;
      onChange(fileId);
      form.setFieldsValue({ [idName]: data.file.response.data.id });
    }
  };

  const onRemove = () => {
    setPreview('');
    setFileList([]);

    // if fileId => user wanted to remove its profile pic
    onChange(null);
    form.setFieldsValue({ [idName]: null });
  };

  const uploadButton = (
    <Avatar
      draggable
      icon={isLoading ? <LoadingOutlined /> : <UserOutlined />}
      //   TODO: move to style file
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );

  const uploadProps = {
    maxCount: 1,
    name: 'file',
    fileList: fileList,
    action: Env.UPLOAD_URL,
    onChange: handleChange,
    headers: { Authorization: `Bearer ${token}` },
  };

  return (
    <MainContainer hasPreview={!!preview && preview !== ''}>
      <Upload
        showUploadList={false}
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={beforeUpload}
        {...uploadProps}
      >
        {preview ? (
          <img
            src={preview}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      {preview && <Button shape="circle" className="remove" icon={<DeleteOutlined />} onClick={onRemove} />}
    </MainContainer>
  );
};

function getBase64(file: RcFile): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default UploadAvatar;

const MainContainer = styled.div<{ hasPreview: boolean }>`
  width: 105px;
  height: 112px;
  ${(props) =>
    props.hasPreview &&
    css`
      display: grid;
      grid-template-columns: [removeAndImgCol] 32px [imgCol] 1fr;
      grid-template-rows: [imgRow] 1fr [removeAndImgRow] 32px;
      .avatar-uploader {
        grid-column: removeAndImgCol / span 2;
        grid-row: imgRow / span 2;
      }

      .remove {
        grid-column: removeAndImgCol / 1;
        grid-row: removeAndImgRow / span 1;
      }
    `}
`;
