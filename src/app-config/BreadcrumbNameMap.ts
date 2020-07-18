import i18n from 'i18next';

type ObjectStringType = {
  [key: string]: string | undefined;
};

export const getBreadcrumbNameMap = () => {
  let breadcrumbNameMap: ObjectStringType = {
    '/': i18n.t('breadcrumb:home'),
    '/dashboard': i18n.t('breadcrumb:dashboard.group'),
    '/dashboard/preview/demo': i18n.t('breadcrumb:dashboard.demo'),
    '/dashboard/designer': i18n.t('breadcrumb:dashboard.designer'),
    '/reports': i18n.t('breadcrumb:reports'),
    '/notifications': i18n.t('breadcrumb:notifications'),
    '/docs': i18n.t('breadcrumb:docs.group'),
    '/docs/app': i18n.t('breadcrumb:docs.app'),
    '/docs/api': i18n.t('breadcrumb:docs.api'),
    '/settings': i18n.t('breadcrumb:settings.group'),
    '/settings/users': i18n.t('breadcrumb:settings.users.users'),
    '/settings/users/:id': i18n.t('breadcrumb:settings.users.edit'),
    '/settings/roles': i18n.t('breadcrumb:settings.roles.roles'),
    '/settings/roles/:id': i18n.t('breadcrumb:settings.roles.edit'),
    //'/settings/roles/new': i18n.t('breadcrumb:settings.roles.new'),
  };
  return breadcrumbNameMap;
};

export const unlinkeables = ['/dashboard', '/docs', '/settings'];
