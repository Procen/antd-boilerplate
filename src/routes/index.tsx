import * as React from 'react';
import { Switch, withRouter } from 'react-router-dom'
import { MainLayout, GuestLayout } from 'containers/layouts';
import AdminRoutes from './admin';
import GuestRoutes from './guest';
import { observer, inject } from 'mobx-react';
import { LoginStore } from 'stores';

import {RouteComponentProps} from "react-router";

@observer
class Routes extends React.Component<RouteComponentProps> {

  routes = () => {
    // const user = LoginStore.session.user.user;
    if (LoginStore.isLogged) {
      return <div className='container'><AdminRoutes /></div>
    } else {
      return <GuestRoutes />
    }
  }

  layout = () => {
      console.log("Routes -> layout -> LoginStore.isLogged", LoginStore.isLogged)
    if (LoginStore.isLogged) {
      return MainLayout;
    } else {
      return GuestLayout;
    }
  }


  render() {
    const Layout = this.layout();

    console.log("Routes -> render -> this.routes()", this.routes())
    return (
      <Layout>
          {this.routes()}
      </Layout>
    );
  }
}

export default withRouter(Routes);
