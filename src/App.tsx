import React from 'react';
import './App.css';

import { Layout } from 'antd';

import Overview from './features/Overview';

function App() {
  return (
    <Layout>
      <Layout.Content style={{ padding: '0 0' }}>
        <Overview />
      </Layout.Content>

      <Layout.Footer style={{ textAlign: 'center' }}>
        Expenses Manger ©2020 Created by R. Denus
      </Layout.Footer>
    </Layout>
  );
}

export default App;
