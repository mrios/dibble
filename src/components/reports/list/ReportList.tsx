import React from 'react';
import HeaderContent from '../../../layout/HeaderContent';
import { useTranslation } from 'react-i18next';

const ReportList = () => {
  const { t } = useTranslation();
  return <HeaderContent title={t('header:content.reports')} />;
};

export default ReportList;
