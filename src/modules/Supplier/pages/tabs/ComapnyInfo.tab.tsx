import { Loader } from '@src/shared/components';
import React, { ReactElement, useEffect } from 'react';
import { UseQueryResult } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyInfoUpsert from '../../containers/CompanyInfoUpsert';
import { Supplier } from '../..';

const CompanyInfoTab = ({
  queryResult,
}: {
  queryResult: UseQueryResult<Supplier | undefined>;
}): ReactElement => {
  const navigate = useNavigate();
  const { supplier_id: id } = useParams();

  useEffect(() => {
    if (queryResult) {
    }
  }, [queryResult]);

  const callbackHandler = () => {
    if (!id) {
      // on successful create -> go Back
      navigate(-1);
    }
  };

  return (
    <>
      {queryResult.isLoading ? (
        <Loader />
      ) : (
        <CompanyInfoUpsert
          editMode={!!id}
          singleData={queryResult.data}
          onCallback={callbackHandler}
          refetch={queryResult.refetch}
        />
      )}
    </>
  );
};

export default CompanyInfoTab;
