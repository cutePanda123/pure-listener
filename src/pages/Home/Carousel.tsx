import { hp } from '@/utils/';
import { viewPortWidth, wp } from '@/utils/';
import React from 'react';
import { StyleSheet } from 'react-native';
import SnapCarousel, { AdditionalParallaxProps } from 'react-native-snap-carousel';
import { Image } from 'react-native';

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

class Carousel extends React.Component {
    renderItem = ({item}: {item: string}, parallaxProps?: AdditionalParallaxProps)  => {
        return (
            <Image source={{uri: item}} style={styles.image}/>
        );
    }
    render() {
        return (
            <SnapCarousel 
                renderItem={this.renderItem}
                data={imageUrls} 
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
            />
        );
    }
};

const styles = StyleSheet.create({
    image: {
        width: itemWidth,
        height: sideHeight,
    }
});

export default Carousel;