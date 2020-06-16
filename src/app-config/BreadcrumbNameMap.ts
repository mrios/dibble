import i18n from 'i18next';

type ObjectStringType = {
  [key: string]: string | undefined;
};

export const getBreadcrumbNameMap = () => {
  let breadcrumbNameMap: ObjectStringType = {
    '/': i18n.t('breadcrumb:home'),
    '/docs': i18n.t('breadcrumb:docs'),
    '/docs/api': i18n.t('breadcrumb:api_docs'),
    '/settings': i18n.t('breadcrumb:settings'),
  };
  return breadcrumbNameMap;
};
