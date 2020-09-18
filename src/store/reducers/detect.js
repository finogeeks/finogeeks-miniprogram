import {
  SAVE_DETECT_STATE,
} from '@/constants/detect';

const INITIAL_STATE = {};

export default function detect(
  state = INITIAL_STATE,
  {type, detect},
) {
  switch (type) {
    case SAVE_DETECT_STATE:
      console.log('==========SAVE_DETECT_STATE========');
      console.log(detect);
      console.log(Object.assign(state, detect));
      return Object.assign(state, detect);
    default:
      return state;
  }
}
