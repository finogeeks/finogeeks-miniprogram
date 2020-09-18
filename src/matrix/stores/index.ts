import RoomStore from './room';
import UserStroe from './user';
import { Store } from '../interface/store';

export default class IMStore implements Store {
  room:RoomStore = new RoomStore()
  user:UserStroe = new UserStroe()
}