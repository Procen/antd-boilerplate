import { IUser } from 'declarations/user';

export interface ISession {
  user: IUser | {},
  token: string | null
}