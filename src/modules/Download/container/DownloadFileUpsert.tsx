/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { PlusCircleOutlined } from '@ant-design/icons';
import { GlobalMutationProps } from '@src/shared/models';
import { Button, Col, Row, Typography, message } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import DownloadFileForm from '../components/DownloadFileForm';
import Fallback from '../components/Fallback';
import { DownloadFileFormCtx, DownloadFileModel } from '../model/DownloadFile.entity';
import { selectedCategoryAtom } from '../service/DownloadCategory.store';
import { deleteDownloadFile, downloadFilesApi } from '../service/downloadFile.service';

type Props = {
  filesData: DownloadFileModel[] | undefined;
};

const DownloadFileUpsert = ({ filesData: _filesData }: Props): ReactElement => {
  const { t } = useTranslation();

  const [categoryData] = useAtom(selectedCategoryAtom);
  if (!categoryData) return <Fallback />;

  const { mutate } = useMutation(({ id, values }: GlobalMutationProps<DownloadFileFormCtx>) => {
    return id ? downloadFilesApi.updateOne(id, values) : downloadFilesApi.createOne(values);
  });

  const { mutate: deleteFile } = useMutation((fileId: number) => deleteDownloadFile(fileId));

  const [filesData, setFilesData] = useState(_filesData ?? []);
  const [pending, setPending] = useState<number>(-2);

  const formSubmitHandler = (id: number, formValues: DownloadFileModel) => {
    const { countries, downloadCategories, careerSteps, customerSteps, languages, file_id, ...restValues } =
      formValues;

    if (!file_id) {
      message.error(t('Download.File.FileNotSelected'));
      return;
    }

    setPending(id);

    const download_category_ids = Array.isArray(downloadCategories)
      ? downloadCategories.map((category) => category.id)
      : [];

    const values: Partial<DownloadFileFormCtx> = {
      file_id: file_id,
      country_ids: countries?.map((country) => country.id),
      language_ids: languages?.map((language) => language.id),
      career_step_ids: careerSteps?.map((careerStep) => careerStep.id),
      customer_step_ids: customerSteps?.map((customerStep) => customerStep.id),
      download_category_ids: [categoryData.id, ...download_category_ids],
      ...restValues,
    };

    mutate(
      { id: id === -1 ? undefined : id, values },
      {
        onSuccess: (data: DownloadFileModel) => {
          if (id === -1) {
            setFilesData((prev) => prev.map((file) => (file.id === -1 ? data : file)));
          }
        },
        onSettled: () => {
          setPending(-2);
        },
      },
    );
  };

  const onFileCreate = () => {
    if (!filesData?.some((file) => file.id === -1)) {
      setFilesData((prev) => [
        {
          id: -1,
          name: '',
          file: null,
          image: null,
          countries: null,
          languages: null,
          is_active: true,
          image_path: null,
          careerSteps: null,
          file_id: undefined,
          customerSteps: null,
          image_id: undefined,
          downloadCategories: [categoryData],
        } as DownloadFileModel,
        ...prev,
      ]);
    }
  };

  const onFileRemove = (id: number) => {
    setFilesData((prev) => prev.filter((file) => file.id !== id));

    if (id !== -1) {
      setPending(id);

      deleteFile(id, {
        onSuccess: () => {
          message.success(t('Global.DeletedSuccessfully', { title: t('Download.File.Title') }));
        },
      });
    }
  };

  return (
    <MainContainer>
      <Row className="header" justify="space-between">
        <Col>
          <Typography.Title level={4}>{t('Download.File.FilesList')}</Typography.Title>
        </Col>

        <Col>
          <Button icon={<PlusCircleOutlined />} type="primary" onClick={onFileCreate}>
            {t('Global.Create')}
          </Button>
        </Col>
      </Row>

      {filesData?.map((file, index) => (
        <DownloadFileForm
          initialValues={file}
          key={`file-${index}`}
          isPending={pending === file.id}
          onRemove={() => onFileRemove(file.id)}
          onSubmit={(values) => formSubmitHandler(file.id, values)}
        />
      ))}
    </MainContainer>
  );
};

export default DownloadFileUpsert;

const MainContainer = styled.div`
  & .header {
    padding: 16px 0;

    & button {
      min-width: 180px;
    }
  }
`;
