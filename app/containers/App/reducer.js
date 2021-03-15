/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_USERS_SUCCESS, LOAD_USERS, LOAD_USERS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    users: false,
    total_count: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USERS:
        draft.loading = true;
        draft.error = false;
        draft.userData.users = false;
        draft.userData.total_count = false;
        break;

      case LOAD_USERS_SUCCESS:
        draft.userData.users = action.users.items;
        draft.userData.total_count = action.users.total_count;
        draft.currentUser = action.username;
        draft.loading = false;
        break;

      case LOAD_USERS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
