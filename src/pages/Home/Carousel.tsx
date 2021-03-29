import {RootState} from '@/models/';
import {ICarouselImage} from '@/models/home';
import {hp} from '@/utils/';
import {viewPortWidth, wp} from '@/utils/';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SnapCarousel, {
  AdditionalParallaxProps,
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import {connect, ConnectedProps} from 'react-redux';

const imageUrls: string[] = [
  'https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/1.jpg',
  'https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/2.jpg',
  'https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/3.jpg',
  'https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/4.jpg',
  'https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/5.jpg',
  'https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/6.jpg',
];

const sliderWidth = viewPortWidth;
const sideWidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sideWidth + wp(2) * 2;

const mapStateToProps = (state: RootState) => ({
  images: state.home.carouselImages,
  activeCarouselIndex: state.home.activeCarouselIndex,
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class Carousel extends React.Component<IProps> {
  get pagination() {
    const images = this.props.images;
    const activeCarouselIndex = this.props.activeCarouselIndex;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          activeDotIndex={activeCarouselIndex}
          dotsLength={images.length}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }

  renderItem = (
    {item}: {item: ICarouselImage},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.real_image}}
        style={styles.iamge}
        containerStyle={styles.imageContainer}
        parallaxFactor={0.8}
        showSpinner={true}
        spinnerColor="rgba(0, 0, 0, 0.25)"
        {...parallaxProps}
      />
    );
  };
  render() {
    const images = this.props.images;
    return (
      <View>
        <SnapCarousel
          renderItem={this.renderItem}
          data={images}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          loop={true}
          autoplay={true}
          onSnapToItem={this.onSnapToItem}
        />
        {this.pagination}
      </View>
    );
  }

  onSnapToItem = (index: number) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/setState',
      payload: {
        activeCarouselIndex: index,
      },
    });
  };
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
  },
  iamge: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default connector(Carousel);
