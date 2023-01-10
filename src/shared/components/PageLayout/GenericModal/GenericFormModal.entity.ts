import { FactoryModule } from '@src/shared/models';
import { ReactNode } from 'react';

export interface GenericModalProps<T> {
  children: ReactNode;
  module: FactoryModule<T>;
}
