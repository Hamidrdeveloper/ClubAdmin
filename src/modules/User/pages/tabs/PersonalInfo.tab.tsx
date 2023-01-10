import { Loader } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';

import PersonalInfoUpsert from '../../containers/PersonalInfoUpsert';
import { User } from '../..';

const PersonalInfoTab = ({
  onCallback,
  queryResult,
}: {
  onCallback?: (data: User) => void;
  queryResult: UseQueryResult<User | undefined>;
}): ReactElement => {
  const { user_id: id } = useParams();

  const callbackHandler = (data: User) => {
    if (!id) {
      onCallback?.(data);
    }
  };

  return (
    <>
      {queryResult.isLoading ? (
        <Loader />
      ) : (
        <PersonalInfoUpsert
          editMode={!!id}
          singleData={queryResult.data}
          onCallback={callbackHandler}
          refetch={queryResult.refetch}
        />
      )}
    </>
  );
};

export default PersonalInfoTab;
