import {takeEvery, takeLatest, call, fork, put, take} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

/*
    Generator functions
*/

// Worker saga
function* getUsers() {
    try {
        const result = yield call(api.getUsers);
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }));
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to get the user'
        }));
    }
}
// Watcher saga
function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

function* createUser({payload}) {
    try{
        yield call(api.createUser, {
            firstName: payload.firstName,
            lastName: payload.lastName
        });
        yield call(getUsers);
    } catch(e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to create the user'
        }));
    }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

function* deleteUser(userId) {
    try{
        yield call(api.deleteUser, userId);
        yield call(getUsers);
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to delete the user'
        }));
    }
}

function* watchDeleteUserRequest() {
    while (true){
        const {payload} = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, payload.userId);
    }
}

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
];

export default usersSagas;