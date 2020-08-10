import * as React from 'react';
import { observer } from 'mobx-react';
import { LoginService } from 'services'
import { Form, Input, Button, Row, Col, Typography } from 'antd';

// import LoginService, { ILoginService } from '../loginService';

import { RouteComponentProps } from "react-router";

// let UserLoginService = new LoginService();

interface Props {
}


interface ILoginAttributes {
  email: string,
  password: string
}

const { Title } = Typography;

@observer
class Login extends React.Component<Props & RouteComponentProps> {

  handleSubmit = (values: any) => {
    console.log("Login -> handleSubmit -> values", values)
    // this.props.form.validateFields((err: object, values: ILoginAttributes) => {
    //   if (!err) {
        LoginService.login(values.email, values.password)
    //   }
    // });
  }

  render() {
    return (
      <Row className='unauthorized-container' justify='center' align='middle'>
        <Row justify='center' className='w-300'>
           <Col className='layout-content w-100p'>
            <Row align='middle' justify='center'>
              <Title>Login</Title>
            </Row>
            <Row className="w-100p">
              <Form className="w-100p" onFinish={this.handleSubmit} name='signIn'>
                <Form.Item
                  name='email'
                  rules={[{ required: true }]}
                >
                  <Input placeholder='Email' />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[{ required: true }]}
                >
                  <Input type="password" placeholder='Password' />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" size='large' htmlType="submit">
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </Row>
            <Row className='ta-c'>
              <a href="#" onClick={(e) => {e.preventDefault(); this.props.history.push('/reset')}} className='link'>Forgot password</a>
            </Row>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Login;
