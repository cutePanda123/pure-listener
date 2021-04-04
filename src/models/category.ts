import { Model, Effect, SubscriptionsMapObject } from 'dva-core-ts';
import { Reducer } from 'redux';

interface ICategory {
    id: string;
    name: string;
    classify?: string;
};

interface CategoryModelState {
    selectedCategories: ICategory[];
    candidateCategories: ICategory[];
};

interface CategoryModel extends Model {
    namespace: 'category',
    state: CategoryModelState;
    effects: {
        loadData: Effect;
    },
    reducers: {
        setState: Reducer<CategoryModelState>;
    },
    subscriptions: SubscriptionsMapObject;
};

const initialState: CategoryModelState = {
    selectedCategories: [
        {
            id: 'home',
            name: 'Recommend',
        },
        {
            id :'vip',
            name: 'VIP',
        },
    ],
    candidateCategories: [],
};