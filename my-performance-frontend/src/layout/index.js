import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from './user/login';
import AppList from '@pages/app_list';
import Pages from './pages';

class index extends Component {

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route path={'/login'} component={Login} />
            <Route path={'/application'} component={AppList} />
            <Route path={'/home'} component={Pages} />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>)
  }
}

export default index;