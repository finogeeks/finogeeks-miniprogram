import {
  UPDATE_SEARCH_RESULT,
} from '@/constants/search';

export function updateSearch({searchResult}) {
  console.log('==========UPDATE_SEARCH_RESULT========');
  console.log(searchResult);
  return {
    type: UPDATE_SEARCH_RESULT,
    searchResult,
  };
}
