import {
  SAVE_REDACT_MESSAGE,
} from '@/constants/redact';

export function saveRedact(redact) {
  console.log('==========SAVE_REDACT_MESSAGE========');
  console.log(redact);
  return {
    type: SAVE_REDACT_MESSAGE,
    redact,
  };
}
