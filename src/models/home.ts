import { resolvePlugin } from '@babel/core';
import {Effect, Model} from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';

const CAROUSEL_DATA_ENDPOINT = '/mock/29/carousel';
const GUESS_YOU_LIKE_DATA_ENDPOINT = '/mock/29/guess';
const CHANNEL_DATA_ENDPOINT = '/mock/29/channel';

export interface ICarouselImage {
    id: string;
    imageURL: string;
    colors: [string, string],
    real_image: string,
};

export interface IGuessYouLikeImage {
    id: string;
    title: string;
    imageURL: string;
};

export interface IChannel {
    id: string;
    title: string;
    imageURL: string;
    remark: string;
    played_count: number;
    playing_count: number;
}

export interface HomeState {
    carouselImages: ICarouselImage[];
    guessImages: IGuessYouLikeImage[];
    channels: IChannel[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
      setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarouselImages: Effect;
    fetchGuessImages: Effect;
    fetchChannelData: Effect;
  };
}

const initialState: HomeState = {
    carouselImages: [],
    guessImages: [],
    channels: [],
};

const homeModel: HomeModel = {
    namespace: 'home',
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *fetchCarouselImages(_, {call, put}) {
            const {data, state, msg} = yield call(axios.get, CAROUSEL_DATA_ENDPOINT);
            console.log('carousel images data: ', data);
            yield put({
                type: 'setState',
                payload: {
                    carouselImages: data,
                },
            });
        },
        *fetchGuessImages(_, {call, put}) {
            const {data, state, msg} = yield call(axios.get, GUESS_YOU_LIKE_DATA_ENDPOINT);
            console.log('guess images data: ', data);
            yield put({
                type: 'setState',
                payload: {
                    guessImages: data,
                },
            });
        },
        *fetchChannelData(_, {call, put}) {
            const {data, state, msg} = yield call(axios.get, CHANNEL_DATA_ENDPOINT);
            console.log('channel data: ', data);
            yield put({
                type: 'setState',
                payload: {
                    channels: data.results,
                },
            });
        }
    }
}

export default homeModel;