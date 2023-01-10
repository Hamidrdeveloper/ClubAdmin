import { SocialMediaModel } from '@src/modules/ShopSettings/model/socialMedia.entity';
import { socialMediaAtom } from '@src/modules/ShopSettings/services/Stores/socialMediaStore';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

interface Props {
  isMulti: boolean;
  pending?: boolean;
  disabled?: boolean;
  value: SocialMediaModel | SocialMediaModel[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: SocialMediaModel | SocialMediaModel[]) => void;
}

function SocialMediaSelect({
  value,
  isMulti = false,
  pending = false,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [socialMedia] = useAtom<SocialMediaModel[]>(socialMediaAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as SocialMediaModel[]) : (data as SocialMediaModel));

  return (
    <>
      <Select
        isLoading={pending ? pending : !socialMedia ? true : undefined}
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        options={socialMedia}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.url)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={value}
      />
    </>
  );
}

export default SocialMediaSelect;
