import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../service/orders';

const authTokenSelector = state => state.auth.loginMessage.token;
const userIdSelector = state => state.auth.loginMessage.userId;

function* orderFetchTask(action) {
  try {
    const { payload } = action;

    const authToken = yield select(authTokenSelector);
    const userId = yield select(userIdSelector);

    const res = yield call(API.getOrders, userId, {
      Authorization: `Bearer ${authToken}`,
    });


    if (res.status === 200) {
      yield put({
        type: 'FETCH_ORDERS_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_ORDERS_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_ORDERS_ERROR',
      payload: e.data,
    });
  }
}

function* orderTask(action) {
  try {
    const { payload } = action;

    const authToken = yield select(authTokenSelector);
    const userId = yield select(userIdSelector);

    const res = yield call(API.createOrder, userId, payload.items, payload.total, {
      Authorization: `Bearer ${authToken}`,
    });


    if (res.status === 200) {
      yield put({
        type: 'CREATE_ORDER_SUCCESS',
        payload: res.data.order,
      });
    } else {
      yield put({
        type: 'CREATE_ORDER_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'CREATE_ORDER_ERROR',
      payload: e.data,
    });
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_ORDERS', orderFetchTask);
  yield takeLatest('CREATE_ORDER', orderTask);
}

export default orderSaga;
