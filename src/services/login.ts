import { action } from 'mobx';
import axios from 'axios';
import { get } from 'lodash';

import { message } from 'antd';
import { LoginStore }  from 'stores';

import Constants from 'constants';

export interface ILogin {
  login(email: string, password: string): Promise<object>
}

class Login implements ILogin {

  @action.bound
  async login(email: string, password: string) {
    const response = await this.loginRequest(email, password);

    if (response.status == 200) {
      const { token, user } = response.data.data;
      const userAttributes = get(user, 'data.attributes');

      if (token) {
        await LoginStore.login(userAttributes, token);
      }
    }

    return response.status;
  }

  loginRequest(email: string, password: string): any {
    return axios.post('/api/v1/auth/login', { email, password }).catch((error: any) =>
      message.error("can't authorize")
    );
  }

  @action
  async logout() {
    if (LoginStore.isLogged) {
      await LoginStore.logout();
    }
  }

  // @action.bound
  // async reset(password: string, password_confirmation: string, reset_password_token: string, callback: Function) {
  //   const response = await this.resetRequest(password, password_confirmation, reset_password_token);

  //   if (response && response.status == 200) {
  //     message.success('Password updated!')
  //     callback()
  //   } else {
  //     message.error(i18next.t('login.cantAuthorize'))
  //   }
  //   return response.status;
  // }

  // resetRequest(password: string, password_confirmation: string, reset_password_token: string): any {
  //   const data = {
  //     password: password,
  //     password_confirmation: password_confirmation,
  //     reset_password_token: reset_password_token
  //   }
  //   return axios.patch('/api/v1/update_passwords', { user: data});
  // }

  // @action.bound
  // async forgot(email: string, callback: Function) {
  //   const response = await this.forgotRequest(email);
  //   console.log(response)
  //   if (response.status == 200) {
  //     message.success('We sent you an email with details on how to create a new password');
  //     callback()
  //   }
  // }

  // forgotRequest(email: string): any {
  //   return axios.post('/api/v1/forgot_passwords', { email: email})
  //   .catch((error) => {
  //       message.error('There is no user with this email address in the system');
  //   })
  // }
}

export default new Login();
