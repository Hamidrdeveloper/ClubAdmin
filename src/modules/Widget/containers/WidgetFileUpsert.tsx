import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import WidgetFileForm from '../components/WidgetFileForm';
import { WidgetFile } from '../model/widget.entity';
import { createWidgetFile, deleteSingleFile, updateWidgetFile } from '../services/widget.service';

const WidgetFileUpsert = ({ widget_id, data }: { widget_id: number; data: WidgetFile[] }): ReactElement => {
  const { t } = useTranslation();
  const [pending, setPending] = useState<number>(-2);
  const [widgetFiles, setWidgetFiles] = useState<WidgetFile[]>([]);

  useEffect(() => {
    if (data) {
      setWidgetFiles(data);
    }
  }, [data]);

  const onCreateWidgetFile = () => {
    if (!widgetFiles.some((file) => file.id === -1)) {
      setWidgetFiles((prev) => [
        { id: -1, file_path: null, translate: [] as unknown } as WidgetFile,
        ...prev,
      ]);
    }
  };

  const handleSubmit = (id: number, formValues: WidgetFile) => {
    setPending(id);
    const values: Partial<WidgetFile> = {
      ...formValues,
      widget_id,
      translate: [{ ...formValues.translate[0], locale: 'de' }],
    };

    if (id !== -1) {
      updateWidgetFile(id, values)
        .then(() => {
          setPending(-2);
        })
        .catch(() => setPending(-2));
    } else if (id === -1) {
      createWidgetFile(values)
        .then((data) => {
          setPending(-2);
          setWidgetFiles((prev) => prev.map((file) => (file.id === -1 ? data : file)));
        })
        .catch(() => setPending(-2));
    }
  };

  const handleRemove = (id: number) => {
    setWidgetFiles((prev) => prev.filter((file) => file.id !== id));

    if (id !== -1) {
      deleteSingleFile(id);
    }
  };

  return (
    <MainContainer>
      <Row className="header" justify="space-between">
        <Col>
          <Typography.Title level={4}> {t('Widget.FileList')}</Typography.Title>
        </Col>

        <Col>
          <Button icon={<PlusCircleOutlined />} type="primary" onClick={onCreateWidgetFile}>
            {t('Global.Create')}
          </Button>
        </Col>
      </Row>
      {widgetFiles.map((file, index) => (
        <WidgetFileForm
          initialValues={file}
          key={`widget-${index}`}
          isPending={pending === file.id}
          onRemove={() => handleRemove(file.id)}
          onSubmit={(values) => handleSubmit(file.id, values)}
        />
      ))}
    </MainContainer>
  );
};

export default WidgetFileUpsert;

const MainContainer = styled.div`
  & .header {
    padding: 16px 0;

    & button {
      min-width: 180px;
    }
  }
`;
