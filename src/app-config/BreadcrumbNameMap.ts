type ObjectStringType = {
  [key: string]: string | undefined;
};

export const getBreadcrumbNameMap = () => {
  let breadcrumbNameMap: ObjectStringType = {
    '/': 'Home',
    '/docs': 'Docs',
    '/docs/api': 'API Documentation',
    '/settings': 'Settings',
  };
  return breadcrumbNameMap;
};
