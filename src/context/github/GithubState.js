import React, { useReducer } from 'react';
import axios from 'axios';
import githubReducer from './githubReducer';
import GithubContext from './githubContext';
import { SEARCH_USERS, SET_lOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  let githubClientId;
  let githubClientSecret;

  if (process.env.NODE_ENV !== 'production') {

    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET

  } else {

    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.CLIENT_SECRET
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Search Users

  const searchUsers = async (text) => {

    setLoading();

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  }

  //Get User
  const getUser = async (username) => {

    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({ type: GET_USER, payload: res.data });

  };

  //Get repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({ type: GET_REPOS, payload: res.data });
  }


  //Clear users
  const clearUsers = () => {

    dispatch({ type: CLEAR_USERS });

  }

  //Set loading
  const setLoading = () => dispatch({ type: SET_lOADING });

  return (
    <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading, searchUsers, clearUsers, getUser, getUserRepos }}>
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState;