import React, { Fragment } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from 'components/authentication/login';

const Guest = () => {
  return (
    <Switch>
      <Route path='/' component={Login} exact/>
    </Switch>
  );
}

export default Guest;