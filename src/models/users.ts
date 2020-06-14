import { Reducer, Effect, Subscription } from 'umi';
import { getList, updateUserInfo, deleteUser, addUser } from '@/service/users';
import { SingleUserType } from '@/types/users';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

interface userModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    setData: Reducer<UserState>;
  };
  effects: {
    getList: Effect;
    changeUserInfo: Effect;
    deleteItem: Effect;
    addUserItem: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const userModel: userModelType = {
  namespace: 'users',
  state: [],

  effects: {
    *getList(action, { put, call }) {
      const res = yield call(getList);
      yield put({
        type: 'setData',
        payload: res.data,
      });
    },

    *changeUserInfo({ payload: { values, id } }, { put, call }) {
      yield call(updateUserInfo, {
        values,
        id,
      });
      yield put({
        type: 'getList',
      });
    },

    *deleteItem({ payload: { id } }, { put, call }) {
      yield call(deleteUser, {
        id,
      });
      yield put({
        type: 'getList',
      });
    },

    *addUserItem({ payload: { values } }, { put, call }) {
      yield call(addUser, {
        values,
      });
      yield put({
        type: 'getList',
      });
    },
  },
  reducers: {
    setData(state, action) {
      return action.payload;
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'getList',
          });
        }
      });
    },
  },
};

export default userModel;
