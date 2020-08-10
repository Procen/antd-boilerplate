import { observable, action } from 'mobx';
import { IUser } from 'declarations';

export class UserStore {

  @observable
  selected: {} | IUser = {}

  @action
  setSelected(value: {} | IUser) {
    this.selected = value;
  }

}

export default (new UserStore())

