import home, {HomeState} from './home';
import { DvaLoadingState } from 'dva-loading-ts';
import category, {CategoryModelState} from './category';

const models = [home, category];

export type RootState = {
    home: HomeState;
    category: CategoryModelState;
    loading: DvaLoadingState;
} & {
    [key: string]: typeof home.state;
};

export default models;