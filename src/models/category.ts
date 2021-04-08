import storage, {load} from '@/config/storage';
import axios from 'axios';
import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import {RootState} from '.';

const CATEGORY_DATA_URL = '/mock/29/category';

export interface ICategory {
  id: string;
  name: string;
  category?: string;
}

export interface CategoryModelState {
  selectedCategories: ICategory[];
  candidateCategories: ICategory[];
  isEditMode: boolean;
}

interface CategoryModel extends Model {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    loadData: Effect;
    toggleEditMode: Effect;
  };
  reducers: {
    setState: Reducer<CategoryModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState: CategoryModelState = {
  selectedCategories: [
    {
      id: 'home',
      name: 'Recommend',
    },
    {
      id: 'vip',
      name: 'VIP',
    },
  ],
  candidateCategories: [],
  isEditMode: false,
};

const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initialState,
  effects: {
    *toggleEditMode({payload}, {put, select}) {
      const category = yield select(({category}: RootState) => category);
      yield put({
        type: 'setState',
        payload: {
          isEditMode: !category.isEditMode,
          selectedCategories: payload.selectedCategories,
        },
      });
      if (category.isEditMode) {
        storage.save({
          key: 'selectedCategories',
          data: payload.selectedCategories,
        });
      }
    },
    *loadData(_, {call, put}) {
      const selectedCategories = yield call(load, {key: 'selectedCategories'});
      const candidateCategories = yield call(load, {
        key: 'candidateCategories',
      });
      if (selectedCategories) {
        yield put({
          type: 'setState',
          payload: {
            selectedCategories,
            candidateCategories,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            candidateCategories,
          },
        });
      }
    },
  },
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  // dva will call all the functions inside subscriptions after startup
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'loadData'});
    },
    asyncStorage() {
      storage.sync.candidateCategories = async () => {
        const {data} = await axios.get(CATEGORY_DATA_URL);
        return data;
      };
      storage.sync.selectedCategories = async () => {
        return null;
      };
    },
  },
};

export default categoryModel;
