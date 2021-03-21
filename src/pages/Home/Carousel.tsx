import { ICarouselImage } from '@/models/home';
import { hp } from '@/utils/';
import { viewPortWidth, wp } from '@/utils/';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SnapCarousel, { AdditionalParallaxProps, Pagination, ParallaxImage } from 'react-native-snap-carousel';

const imageUrls: string[] = [
    "https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/1.jpg",
    "https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/2.jpg",
    "https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/3.jpg",
    "https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/4.jpg",
    "https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/5.jpg",
    "https://cutepandastorageaccount.blob.core.windows.net/purelistenapp/carousel/6.jpg"
];

const sliderWidth = viewPortWidth;
const sideWidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sideWidth + wp(2) * 2;

interface IProps {
    data: ICarouselImage[];
}

class Carousel extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeSlideIndex: 0,
        };
    }

    get pagination() {
        const images = this.props.data;
        const {activeSlideIndex} = this.state;
        return (
            <View style={styles.paginationWrapper}>
                <Pagination
                    activeDotIndex={activeSlideIndex}
                    dotsLength={images.length}
                    containerStyle={styles.paginationContainer}
                    dotContainerStyle={styles.dotContainer}
                    dotStyle={styles.dot}
                    inactiveDotScale={0.7}
                    inactiveDotOpacity={0.4}
                />
            </View>
        )
    }

    renderItem = ({ item }: { item: ICarouselImage }, parallaxProps?: AdditionalParallaxProps) => {
        return (
            <ParallaxImage 
                source={{ uri: item.real_image }} 
                style={styles.iamge} 
                containerStyle={styles.imageContainer}
                parallaxFactor={0.8}
                showSpinner={true}
                spinnerColor="rgba(0, 0, 0, 0.25)"
                {...parallaxProps}/>
        );
    }
    render() {
        const images = this.props.data;
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
        this.setState({
            activeSlideIndex: index,
        });
    }
};

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

export default Carousel;