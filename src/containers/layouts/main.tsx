import * as React from 'react';
import { observer } from 'mobx-react';
import { UserOutlined, SketchOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Avatar, Menu, Dropdown, Button } from 'antd';
import { LoginService } from 'services';
import { LoginStore } from 'stores';

const { Header, Content } = Layout;
type Props = { children: any};

@observer
class Main extends React.Component<Props> {

  logout = (): void => {
    LoginService.logout();
  }


  userMenu = () => (
    <Menu>
      <Menu.Item onClick={this.logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  render() {
    const { children } = this.props;
    // const user = LoginStore.session.user.user;
    console.log("Main -> render -> LoginStore.session", LoginStore.session)

    return (
      <Layout>
        <Header>
          <Row justify='space-between' align='middle'>
            <Col>parcel4you</Col>
            <Col>
              <Dropdown overlay={this.userMenu()} trigger={['click']}>
                <Avatar icon={<UserOutlined />} size={35} />
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
