import { RolePure } from '../model/role.entity';

export interface RoleFormContext extends RolePure {
  permissions: number[];
}
