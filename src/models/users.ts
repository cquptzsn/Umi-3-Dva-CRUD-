import { Reducer, Effect, Subscription } from "umi";
import { getList, updateUserInfo, deleteUser } from "@/service/users";

interface userModelType {
  namespace: 'users',
  state: {},
  reducers: {
    setData: Reducer
  },
  effects: {
    getList: Effect,
    changeUserInfo: Effect,
    deleteItem: Effect
  },
  subscriptions: {
    setup: Subscription
  }
}

const userModel: userModelType = {
  namespace: 'users',
  state: [],

  effects: {
    *getList(action, { put, call }) {
      const res = yield call(getList);
      yield put({
        type: 'setData',
        payload: res.data
      })
    },

    *changeUserInfo({ payload: { values, id } }, { put, call }) {
      yield call(updateUserInfo, {
        values,
        id
      })
    },

    *deleteItem({payload: { id }}, { put, call }) {
      yield call(deleteUser, {
        id
      });
    }
  },

  reducers: {
    setData(state, action) {
      return action.payload
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen( (location) => {
        if(location.pathname === '/users') {
          dispatch({
            type: 'getList'
          })
        }
      })
    }
  }
}

export default userModel;


