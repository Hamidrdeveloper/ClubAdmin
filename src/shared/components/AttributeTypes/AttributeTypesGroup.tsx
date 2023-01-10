// TODO: Form list goes here
// TODO: combination of two selects
// TODO: add to previous dir index
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import i18n from '@src/core/i18n/config';
import AttributeOptionsSelect from '@src/modules/AttributeOptions/containers/AttributeOptionsSelect';
import { AT_Options } from '@src/modules/AttributeOptions/model/attributeOptions.entity';
import { AttributeTypeSelect, AttributeTypes } from '@src/modules/AttributeType';
import AttributeTypeModule from '@src/modules/AttributeType/AttributeType.module';
import { Button, Checkbox, Form, FormInstance, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import Styles from './NameInput.style';

interface Props {
  disabled: boolean;
  form: FormInstance;
  attributeTypeName: string;
  attributeOptionName: string;
  initialValues: any;
  haveVisibleField: boolean;
  multiOptions: boolean;
  name: string | number | (string | number)[];
}

type data = {
  type: AttributeTypes;
  options: AT_Options[];
};
interface dataStateProps {
  version: number;
  data: data[];
}

const module = new AttributeTypeModule();

const AttributeTypesInput: React.FC<Partial<Props>> = ({
  disabled = false,
  name = 'attributes',
  haveVisibleField = true,
  multiOptions = false,
  attributeTypeName = 'attributeType',
  attributeOptionName = 'attributeTypeOption',
  initialValues,
  form,
}) => {
  const [arr, setArr] = useState<dataStateProps>({
    version: 0.1,
    data: [],
  });

  const getAttributeOptions = (typeId: number): Promise<AttributeTypes> => {
    // Get attribute options from selected typeId
    return module.apiService.getOne(typeId);
  };

  const setAttributeOptionsFn = (typeId: number, name: number) => {
    getAttributeOptions(typeId).then((type): void => {
      const optionsData = type?.attributeTypeOptions;

      setArr(({ data }) => {
        const tempData: data = { options: optionsData, type: type };
        data[name] = tempData;
        return { version: Math.random(), data };
      });
    });
  };
  const clearATOptionFromForm = (fieldIndex: number) => {
    // getting data from form and setting it to clearer options - but we dont wanna delete selected attribute type
    if (Array.isArray(name)) return;

    const prevValues = form?.getFieldsValue();
    const deletedField = prevValues[name][fieldIndex];
    prevValues[name][fieldIndex] = {
      ...deletedField,
      [attributeOptionName]: multiOptions ? [] : {},
    };
    const result = { ...prevValues };
    form?.setFieldsValue(result);
  };

  const clearAttributeOptionsFn = (fieldIndex: number) => {
    clearATOptionFromForm(fieldIndex);

    setArr(({ data }) => {
      const tempData: data = { options: [], type: {} as AttributeTypes };
      data[fieldIndex] = tempData;
      return { version: Math.random(), data };
    });
  };

  useEffect(() => {
    if (!initialValues) return;

    // if we had initialValues load its AttributeOptions
    initialValues.forEach((element, index) => {
      const typeId = element?.attributeType?.id;

      // TODO: REF: useQueries
      // https://react-query.tanstack.com/reference/useQueries
      setAttributeOptionsFn(typeId, index);
    });
  }, [initialValues]);

  const onAttributeTypeChange = (typeData: AttributeTypes, name: number): void => {
    clearAttributeOptionsFn(name);

    if (!typeData) return;

    const typeId = typeData.id;

    setAttributeOptionsFn(typeId, name);
  };

  const onFieldRemove = (removeFn, name) => {
    // clear attributeOptions options from its select
    setArr(({ data }) => {
      data.splice(name, 1);
      return { version: Math.random(), data };
    });

    removeFn(name);
  };

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }, index: number) => {
            return (
              <Styles.InputContainer key={key}>
                <Input.Group style={{ display: 'flex', flex: 1, gap: '12px' }}>
                  <Form.Item
                    {...restField}
                    style={{ flexGrow: 1 }}
                    required
                    name={[name, attributeTypeName]}
                    fieldKey={[fieldKey, attributeTypeName]}
                    rules={[{ required: true, message: `Item ${name + 1} Attribute Type is required` }]}
                  >
                    <AttributeTypeSelect onChange={(data) => onAttributeTypeChange(data, name)} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    style={{ flexGrow: 3 }}
                    required
                    name={[name, attributeOptionName]}
                    fieldKey={[fieldKey, attributeOptionName]}
                    rules={[
                      { required: true, message: `Item ${name + 1} ${attributeOptionName} is required` },
                    ]}
                  >
                    <AttributeOptionsSelect
                      isMulti={multiOptions}
                      name={name}
                      AT={arr?.data?.[name]?.type}
                      refetchFn={setAttributeOptionsFn}
                      ATOptions={arr?.data?.[name]?.options}
                    />
                  </Form.Item>

                  {haveVisibleField && (
                    <Form.Item
                      {...restField}
                      name={[name, 'visible']}
                      required
                      fieldKey={[fieldKey, 'visible']}
                      valuePropName="checked"
                    >
                      <Checkbox>{i18n.t('Global.IsVisible')}</Checkbox>
                    </Form.Item>
                  )}
                </Input.Group>

                {!disabled && (
                  <div>
                    {/* Plus icon on the last field only */}
                    {index === fields.length - 1 ? (
                      <Space>
                        <Button
                          ghost
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => add(null, fields.length)}
                        />

                        {fields.length > 1 && (
                          <Button
                            ghost
                            danger
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={() => onFieldRemove(remove, name)}
                          />
                        )}
                      </Space>
                    ) : (
                      <Button
                        ghost
                        danger
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => onFieldRemove(remove, name)}
                      />
                    )}
                  </div>
                )}
              </Styles.InputContainer>
            );
          })}
        </>
      )}
    </Form.List>
  );
};

export default AttributeTypesInput;
