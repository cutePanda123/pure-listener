import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '.';

const CAROUSEL_DATA_ENDPOINT = '/mock/11/carousel';
const GUESS_YOU_LIKE_DATA_ENDPOINT = '/mock/11/guess';
const CHANNEL_DATA_ENDPOINT = '/mock/11/channel';

export interface ICarouselImage {
  id: string;
  imageURL: string;
  colors: [string, string];
  real_image: string;
}

export interface IGuessYouLikeImage {
  id: string;
  title: string;
  imageURL: string;
}

export interface IChannel {
  id: string;
  title: string;
  imageURL: string;
  remark: string;
  played_count: number;
  playing_count: number;
}

export interface IPagination {
  current: number;
  total: number;
  hasMore: boolean;
}

export interface HomeState {
  carouselImages: ICarouselImage[];
  guessImages: IGuessYouLikeImage[];
  channels: IChannel[];
  pagination: IPagination;
  activeCarouselIndex: number;
  isGradientVisible: boolean;
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
  pagination: {
    current: 0,
    total: 0,
    hasMore: true,
  },
  activeCarouselIndex: 0,
  isGradientVisible: true,
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarouselImages(action, {call, put}) {
      const {data, state, msg} = yield call(axios.get, CAROUSEL_DATA_ENDPOINT);

      yield put({
        type: 'setState',
        payload: {
          carouselImages: data,
        },
      });
      if (typeof action.callback === 'function') {
        action.callback();
      }
    },
    *fetchGuessImages(_, {call, put}) {
      const {data, state, msg} = yield call(
        axios.get,
        GUESS_YOU_LIKE_DATA_ENDPOINT,
      );
      
      yield put({
        type: 'setState',
        payload: {
          guessImages: data,
        },
      });
    },
    *fetchChannelData(action, {call, put, select}) {
      const {channels, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let pageIdx = 0;
      if (action.payload && action.payload.loadMore) {
        pageIdx = pagination.current + 1;
      }
      const {data, state, msg} = yield call(axios.get, CHANNEL_DATA_ENDPOINT, {
        params: {
          pageNum: pageIdx,
        },
      });
      //console.log('channel data: ', data);
      let newChannels = data.results;
      if (action.payload && action.payload.loadMore) {
        newChannels = channels.concat(newChannels);
      }

      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            current: data.pagination.current,
            total: data.pagination.total,
            hasMore: newChannels.length < data.pagination.total,
          },
        },
      });
      if (typeof action.callback === 'function') {
        action.callback();
      }
    },
  },
};

export default homeModel;
