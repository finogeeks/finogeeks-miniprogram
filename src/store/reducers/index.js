import { combineReducers } from 'redux';
import navigation from './navigation';
import user from './user';
import search from './search';
import redact from './redact';
import room from './room';
import detect from './detect';

export default combineReducers({
  navigation,
  user,
  search,
  redact,
  room,
  detect,
});
