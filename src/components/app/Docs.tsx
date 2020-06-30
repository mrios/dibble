import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderContent from '../../layout/HeaderContent';

const Docs = (props: any) => {
  const { t } = useTranslation();
  return <HeaderContent title={t('header:content.docs')} />;
};

Docs.propTypes = {};

export default Docs;
