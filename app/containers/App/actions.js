/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './constants';

/**
 *
 */
export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

/**
 *
 *
 */
export function usersLoaded(users, username) {
  return {
    type: LOAD_USERS_SUCCESS,
    users,
    username,
  };
}

/**
 *
 * @param  {object} error The error
 *
 */
export function userLoadingError(error) {
  return {
    type: LOAD_USERS_ERROR,
    error,
  };
}
