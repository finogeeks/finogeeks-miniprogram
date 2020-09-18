import {
    UPDATE_SEARCH_RESULT,
  } from '@/constants/search';
  
  const INITIAL_STATE = {};
  
  export default function search(
    state = INITIAL_STATE,
    {type, searchResult},
  ) {
    switch (type) {
      case UPDATE_SEARCH_RESULT:
        console.log('==========UPDATE_SEARCH_RESULT========');
        console.log(searchResult);
        return {
          ...state,
          searchResult
        };
      default:
        return state;
    }
  }
  