import {
  SAVE_DETECT_STATE,
} from '@/constants/detect';

export function saveDetectState(detect) {
  console.log('==========SAVE_DETECT_STATE========');
  console.log(detect);
  return {
    type: SAVE_DETECT_STATE,
    detect,
  };
}
