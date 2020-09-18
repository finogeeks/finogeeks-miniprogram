import Room from '../stores/room';
import User from '../stores/user';

export enum Action {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  PUT = 'PUT',
};

export interface OptParams<T> {
  id: string,
  item?: T,
}

export interface StoreUpdateEvent<T> {
  type: Action,
  id: string,
  item?: T
  prevItem?: T
}

export interface StoreContainer<T> {
  [id:string]: T 
}

export interface Store {
  room: Room,
  user: User,
}

export enum StoreEvent {
  Room = 'room',
  User = 'user'
}