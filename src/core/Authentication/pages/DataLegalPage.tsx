import { LegalCondition } from '@src/modules/LegalCondition';
import queryString from 'query-string';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getLegalInfoViaTitle } from '../service/api';

const DataLegalPage = (): ReactElement => {
  const { legal_title } = useParams();
  const { search, pathname } = useLocation();

  const [descriptionData, setDescriptionData] = useState<string>('<p></p>');

  useEffect(() => {
    const { query } = queryString.parseUrl(pathname + search);
    if (!legal_title || !query.token) return;

    getLegalInfoViaTitle(legal_title, query.token as string).then((resp: LegalCondition) => {
      setDescriptionData(resp?.description);
    });
  }, []);

  return <span dangerouslySetInnerHTML={{ __html: descriptionData }} />;
};

export default DataLegalPage;
