import { storage } from './storage';
import { IUser } from 'declarations/user';
import { ISession } from 'declarations/session';

const SESSION_KEY = 'session';
class SessionService {

  storeSession(user: IUser | {} = {}, token: string | null): boolean {
    return storage.set(SESSION_KEY, {
      user,
      token
    });
  }

  updateSessionUser(user: IUser | {} = {}): boolean {
    const session: any = storage.get(SESSION_KEY);
    const token = session.token

    return storage.set(SESSION_KEY, {
      user,
      token
    });
  }

  retrieveSession():ISession {
    return {
      user: {},
      token: null,
      ...storage.get(SESSION_KEY)
    };
  }
}

const sessionService = new SessionService();
export { SessionService, sessionService };
