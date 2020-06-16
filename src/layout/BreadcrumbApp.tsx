import React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';
import { getBreadcrumbNameMap } from '../app-config/BreadcrumbNameMap';
import { useTranslation } from 'react-i18next';

const BreadcrumbApp = withRouter((props: any) => {
  const { location } = props;
  const { t } = useTranslation();
  const breadcrumbNameMap = getBreadcrumbNameMap();
  const pathSnippets = location.pathname.split('/').filter((i: any) => i);

  const extraBreadcrumbItems: any = [];
  pathSnippets.forEach((_: any, index: number) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (pathToRegexp(item).test(url)) {
        extraBreadcrumbItems.push(
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[item]}</Link>
          </Breadcrumb.Item>
        );
      }
    });
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="/">
      <Link to="/">{t('breadcrumb:home')}</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <React.Fragment>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </React.Fragment>
  );
});

export default BreadcrumbApp;
