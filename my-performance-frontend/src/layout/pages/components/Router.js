import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import DefaultPages from '@pages/application/default_pages';
import HttpTest from '@pages/application/http_test';
import PagesTest from '@pages/application/pages_test';

class index extends Component {

  render() {
    return (
      <Switch>
        <Route path={'/home/default'} component={DefaultPages} />
        <Route path={'/home/http_test'} component={HttpTest} />
        <Route path={'/home/pages_test'} component={PagesTest} />
      </Switch>
    )
  }
}

export default index;