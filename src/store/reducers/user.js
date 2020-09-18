import {
  SET_USER_SESSION,
  SET_USER_INFO,
  SET_USER_LOCATION,
} from '@/constants/user';

const INITIAL_STATE = {
  info: null,
  session: null,
  location: null,
};

export default function user(
  state = INITIAL_STATE,
  { type, userInfo, userSession, userLocation },
) {
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        info: userInfo,
      };
    case SET_USER_SESSION:
      return {
        ...state,
        session: userSession,
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        location: userLocation,
      };
    default:
      return state;
  }
}
