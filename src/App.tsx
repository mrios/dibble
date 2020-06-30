import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, Layout, BackTop } from 'antd';
import esES from 'antd/es/locale/es_ES';
import './i18n';

import { AppProvider } from './components/app/state/AppContext';
import { SiderApp, ContentApp } from './layout';
import './App.less';

const App: FC = () => (
  <AppProvider>
    <ConfigProvider locale={esES}>
      <Layout className="App">
        <Router>
          <SiderApp />
          <ContentApp />
          <BackTop />
        </Router>
      </Layout>
    </ConfigProvider>
  </AppProvider>
);

export default App;
