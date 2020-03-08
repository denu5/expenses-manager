import React from 'react';
import './App.css';

import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Create from './screens/Create';
import Overview from './screens/Overview';
import Detail from './screens/Detail';

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Layout.Content style={{ padding: '0 50px' }}>
          <Switch>
            <Route exact path="/">
              <Overview />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/detail/:id">
              <Detail />
            </Route>
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          VT Expense ©2020 Created by R. Denus
        </Layout.Footer>
      </Layout>
    </Router>
  );
}

export default App;
