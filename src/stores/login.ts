import { observable, computed, action } from 'mobx';
import axios from 'axios';
import { IUser } from 'declarations/user';
import { ISession } from 'declarations/session';
import { history } from 'utils/history';
import { sessionService } from 'utils/session';
import { debounce } from 'lodash';

export interface Login {
  session: ISession,
  debouncedSetToken(token: string): any
}

export class Login {
  @observable session = sessionService.retrieveSession();

  constructor() {
    this.updateToken();
    this.debouncedSetToken = debounce(this.setToken, 5000);
  }

  @computed
  get isLogged(): boolean {
    return !!(this.session.user && this.session.token)
  }

  @action
  async login(user: IUser, token: string) {
    this.session.user = {};
    this.session.token = token;
    this.updateToken();
    sessionService.storeSession(user, token);
  }

  @action
  async logout() {
    this.session.user = {};
    this.session.token = null;

    this.updateToken();
    history.push('/');

    const { user, token } = this.session;
    sessionService.storeSession(user, token);
  }

  @action
  async updateCurrentUser(user: any) {
    const newUser = {
      ...this.session,
        ...this.session.user,
        user: user
    }

    this.session.user = {...newUser};
    sessionService.updateSessionUser(newUser);
  }

  @action
  setToken(newToken: string) {
    if (typeof newToken !== 'string')
      return;
    this.session.token = newToken;
    this.updateToken();
    const { user, token } = this.session;
    sessionService.storeSession(user, token);
  }

  updateToken() {
    const token = this.session.token;
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      axios.defaults.headers.common['Authorization'] = null;
    }
  }

}

export default new Login();

