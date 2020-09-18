import {
  SAVE_REDACT_MESSAGE,
} from '@/constants/redact';

const INITIAL_STATE = {};

export default function redact(
  state = INITIAL_STATE,
  {type, redact},
) {
  switch (type) {
    case SAVE_REDACT_MESSAGE:
      console.log('==========SAVE_REDACT_MESSAGE========');
      console.log(redact);
      console.log(Object.assign(state, redact));
      return Object.assign(state, redact);
    default:
      return state;
  }
}
