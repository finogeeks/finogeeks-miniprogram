import BaseStore from './base';
import { User } from '../interface/user';
// import { Room, BasicRoom} from '../interface/room';


export default class UserStore extends BaseStore<User> {
  constructor() {
    super('USER');
  }

  init(users: User[]) {
    users.forEach(user => {
      this.store[user.id] = user;
    });
  }

  beforeEmitUpdate(){}
}
