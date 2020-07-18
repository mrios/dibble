import React from 'react';
import HeaderContent from '../../layout/HeaderContent';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return <HeaderContent title={t('header:content.home')} />;
};

Home.propTypes = {};

export default Home;
