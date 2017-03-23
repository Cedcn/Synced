import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import { observer, inject } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import SideBar from './SideBar';
import BaseInfo from './main/BaseInfo';
import Security from './main/Security';


@inject('userinfo') @observer
class Account extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div>
        <AppBar
          title="账号中心"
        />
        <BrowserRouter basename="/account">
          <Grid className="wrapper">
            <Row>
              <Col md={3}>
                <SideBar />
              </Col>
              <Col md={9}>
                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/my" />} />
                  <Route path="/my" component={BaseInfo} />
                  <Route path="/security" component={Security} />
                  <Route path="/*" render={() => <Redirect to="/my" />} />
                </Switch>
              </Col>
            </Row>
          </Grid>
        </BrowserRouter>
      </div>
    );
  }
}

export default Account;
