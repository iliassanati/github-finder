import { SEARCH_USERS, GET_USER, GET_REPOS, SET_lOADING, CLEAR_USERS } from '../types';

export default (state, action) => {

  switch (action.type) {

    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case SET_lOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}