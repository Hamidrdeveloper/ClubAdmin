import { Env } from '@src/core';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { Input, Spin, Typography } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getShopVariationsBySearch } from '../../services/productVariations.service';

let controller: AbortController;

type Props = { onChange: (data: { name: string; price: number }) => void; value?: string };
export const PositionProductSearch: React.FC<Props> = ({ onChange, value: inputValue }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(inputValue);
  const [isPending, setPending] = useState(false);
  const [isProductsVisible, setProductsVisible] = useState(false);
  const [variations, setVariations] = useState<ProductVariation[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setProductsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (inputValue) {
      setValue(inputValue);
    }
  }, [inputValue]);

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setValue(search);

    if (search.length > 3) {
      if (controller) {
        controller.abort();
      }

      controller = new AbortController();
      const signal = controller.signal;

      setPending(true);
      setProductsVisible(true);

      getShopVariationsBySearch(search, signal)
        .then((data) => {
          setPending(false);
          setVariations(data);
          if (data.length === 0) {
            setProductsVisible(false);
          }
        })
        .catch((e) => {
          if (e.message.includes('Cancel')) {
            console.log('Request Cancel');
          }
        });
    }
  };

  const handleSelectProduct = (data: ProductVariation) => {
    setProductsVisible(false);
    onChange({ name: data.name, price: Math.round(Number(data['sale_price']['value']) * 100) / 100 });
  };

  return (
    <MainContainer ref={ref}>
      <Input
        size="large"
        value={value}
        onChange={handleInputSearch}
        placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })}
      />

      {isProductsVisible && (
        <div className="variations">
          {isPending ? (
            <div className="loader">
              <Spin />
            </div>
          ) : (
            <div className="products">
              {variations.map(({ product, ...variation }) => (
                <SingleProduct
                  key={variation.id}
                  onClick={() => handleSelectProduct({ product, ...variation })}
                >
                  <div className="image">
                    <img
                      alt={variation.name}
                      src={Env.PURE_URL + product.file}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.className = 'error-image';
                        currentTarget.src = '/assets/images/global/product.png';
                      }}
                    />
                  </div>

                  <div className="variation-info">
                    <Typography.Text className="title">{variation.name}</Typography.Text>
                    <Typography.Text>
                      Article Number:&nbsp;
                      {variation.number}
                    </Typography.Text>
                  </div>
                </SingleProduct>
              ))}
            </div>
          )}
        </div>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: relative;

  & .variations {
    position: absolute;
    right: 0;
    top: 50px;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    z-index: 2;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    max-height: 200px;
    overflow-y: auto;

    & .products {
      padding: 8px;
    }
  }

  & .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
`;

const SingleProduct = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 8px;
  padding: 8px;

  &:hover {
    & .title {
      color: ${({ theme }) => theme.colors.main};
    }
  }

  & .variation-info {
    display: flex;
    flex-direction: column;
  }

  & .image {
    width: 80px;
    height: 80px;
    text-align: center;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;

      &.error-image {
        width: 60px;
        height: 60px;
      }
    }
  }
`;
