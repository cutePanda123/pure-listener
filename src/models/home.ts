import {Effect, Model} from 'dva-core-ts';
import { Reducer } from 'redux';

export interface HomeState {
    num: number;
}

const action = {
    type: 'add',
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
      add: Reducer<HomeState>;
  };
//   effects: {
//     asyncAdd: Effect;
//   };
}

const initialState = {
    num: 0,
}

const homeModel: HomeModel = {
    namespace: 'home',
    state: initialState,
    reducers: {
        add(state = initialState, { payload }) {
            return {
                ...state,
                num: state.num + payload.num,
            }
        }
    }
}

export default homeModel;