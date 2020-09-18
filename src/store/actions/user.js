import {
  SET_USER_SESSION,
  SET_USER_INFO,
  SET_USER_LOCATION,
} from '@/constants/user';

export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    userInfo,
  };
}

export function setUserSession(userSession) {
  return {
    type: SET_USER_SESSION,
    userSession,
  };
}

export function setUserLocaton(userLocation) {
  return {
    type: SET_USER_LOCATION,
    userLocation,
  };
}
