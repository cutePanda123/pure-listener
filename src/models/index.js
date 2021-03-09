import home, {HomeState} from './home';

const models = [home];

export type RootState = {
    home: HomeState,
}

export default models;