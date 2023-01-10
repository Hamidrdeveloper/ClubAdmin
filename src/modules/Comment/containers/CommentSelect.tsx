import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Comment } from '../model/comment.entity';
import { commentAtom } from '../service/commentStore';

interface Props {
  isMulti: boolean;
  disabled?: boolean;
  value: Comment | Comment[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Comment | Comment[]) => void;
}

function CommentSelect({
  value,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [comments] = useAtom<Comment[]>(commentAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Comment[]) : (data as Comment));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={comments ?? []}
        isLoading={!comments ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.description}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={value}
      />
    </>
  );
}

export default CommentSelect;
