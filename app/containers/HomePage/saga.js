/**
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_USERS } from 'containers/App/constants';
import { usersLoaded, userLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 */
export function* getUsers() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/search/users?q=${username}`;
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const users = yield call(request, requestURL);
    yield put(usersLoaded(users, username));
  } catch (err) {
    yield put(userLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_USERS actions and calls getUsers when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USERS, getUsers);
}
