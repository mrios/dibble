import React from 'react';
import HeaderContent from '../../../layout/HeaderContent';
import { useTranslation } from 'react-i18next';

const NotificationList = () => {
  const { t } = useTranslation();
  return <HeaderContent title={t('header:content.notifications')} />;
};

export default NotificationList;
