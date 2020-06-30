import React from 'react';
import HeaderContent from '../../../layout/HeaderContent';
import { useTranslation } from 'react-i18next';

const ReportList = (props: any) => {
  const { t } = useTranslation();
  return <HeaderContent title={t('header:content.reports')} />;
};

ReportList.propTypes = {};
export default ReportList;
