import { DownloadFileModel } from '@src/modules/Download/model/DownloadFile.entity';
import { Row } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import FilePreview from './FilePreview';

type Props = {
  files: DownloadFileModel[] | undefined;
};
const FilesView = ({ files }: Props): ReactElement => {
  return (
    <CustomRow gutter={[16, 16]}>
      {files?.map((file) =>
        FilePreview({
          id: file.id,
          filePath: file.file?.root_file.path,
          imagePath: file.image_path ?? undefined,
        }),
      )}
    </CustomRow>
  );
};

export default FilesView;

const CustomRow = styled(Row)`
  padding: 20px;
`;
