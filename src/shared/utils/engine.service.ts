import { User } from '@src/core/Authentication/model';
import i18n from '@src/core/i18n/config';
import userModuleInfo from '@src/modules/User/ModuleInfo.json';

const userModuleRoute = userModuleInfo.Route.replace('*', '');

export function removeId(str: string): string {
  return str.replace(/Ids?/, '');
}

export function removeUnderline(str: string): string {
  return str.replace(/_/g, ' ');
}
export function removeDash(str: string): string {
  return str.replace(/-/g, ' ');
}

// Turns camelCase => Camel Case
export function startCase(str: string): string {
  try {
    return (
      str
        // split camelCase string into array
        .split(/(?=[A-Z])/)
        // make the first letter of each word uppercase
        .map((el: string) => el[0].toUpperCase() + el.slice(1))
        // join them with spaces
        .join(' ')
    );
  } catch {
    return '';
  }
}

export const weightFormatter = (weight: number): string => intlNumber(weight) + ' Kg';
export const dimensionFormatter = (dimension: number): string => intlNumber(dimension) + ' cm';

export const intlNumber = (number: number): string =>
  new Intl.NumberFormat(i18n.language ?? 'de').format(number);

// iso3 must be valid from backend - added error boundaries to prevent this error
export const intlCurrency = (iso3: string, price: number): string => {
  try {
    return new Intl.NumberFormat(i18n.language ?? 'en', { style: 'currency', currency: iso3 }).format(price);
  } catch {
    return new Intl.NumberFormat(i18n.language ?? 'en', { style: 'currency', currency: 'EUR' }).format(price);
  }
};

export const intlFormatter = (price: number): string => {
  return new Intl.NumberFormat(i18n.language ?? 'en').format(price);
};

const isValidDate = (d: unknown): boolean => {
  return d instanceof Date && !isNaN(Number(d));
};

export const intlDate = (date: string | Date): string => {
  try {
    const formattedDate: Date = typeof date === 'string' ? new Date(date) : date;
    if (isValidDate(formattedDate)) {
      return new Intl.DateTimeFormat(i18n.language ?? 'de').format(formattedDate);
    } else throw Error();
  } catch {
    return '-';
  }
};

export const intlDateFormat = (has_time = false): string => {
  const dates = new Intl.DateTimeFormat(i18n.language ?? 'de').formatToParts(new Date());
  let result = '';
  //
  dates.map((date) => {
    if (date.type !== 'literal') {
      switch (date.type) {
        case 'day':
          result += 'DD';
          break;

        case 'month':
          result += 'MM';
          break;

        case 'year':
          result += 'YYYY';
          break;
      }
    } else result += date.value;
  });
  //

  if (has_time) {
    result += ' HH:mm';
  }

  return result;
};

export function replaceAll(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(find, 'g'), replace);
}

type generateUserManageLinkBaseOnRoleProps = {
  role: string;
  profile: User;
};
export function generateUserManageLinkBaseOnRole({
  role,
  profile,
}: generateUserManageLinkBaseOnRoleProps): string {
  try {
    const id = profile.id;

    const partnerId = profile?.partner?.id;
    const supplierId = profile?.supplier?.id;

    switch (role) {
      case 'admin':
        return `/admin/users/manage/admin/${id ?? ''}`;
      case 'user':
        return `/admin/users/manage/user/${id ?? ''}`;
      case 'partner':
        if (partnerId) {
          // in case of updating partner, we gotta have its userId not partnerId.
          return `/admin/users/manage/partner/${id}?active=7`;
        } else {
          return `/admin/users/manage/partner/`;
        }
      case 'supplier':
        return `/admin/supplier/manage/${supplierId ?? ''}`;
      default:
        // if the role was undefined or was listed above, it will navigate to user manage link
        return `/admin/users/manage/user/${id ?? ''}`;
    }
  } catch {
    return '#';
  }
}

export function generateUserLinkBaseOnId(id: string): string {
  return `/admin${userModuleRoute}manage/user/${id}`;
}

export function generateUserLinkBasedOnIdAndRole(id: number, role: string): string {
  try {
    switch (role) {
      case 'admin':
        return `/admin/users/manage/admin/${id ?? ''}`;
      case 'user':
        return `/admin/users/manage/user/${id ?? ''}`;
      case 'partner':
        if (id) {
          // in case of updating partner, we gotta have its userId not partnerId.
          return `/admin/users/manage/partner/${id}?active=7`;
        } else {
          return `/admin/users/manage/partner/`;
        }
      case 'supplier':
        return `/admin/supplier/manage/${id ?? ''}`;
      default:
        // if the role was undefined or was listed above, it will navigate to user manage link
        return `/admin/users/manage/user/${id ?? ''}`;
    }
  } catch {
    return '#';
  }
}
