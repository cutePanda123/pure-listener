import { hp } from '@/utils/';
import { viewPortWidth, wp } from '@/utils/';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import SnapCarousel, { AdditionalParallaxProps } from 'react-native-snap-carousel';
import { Image } from 'react-native';

const imageUrls: string[] = [
    "https://media.newyorker.com/photos/5f414de2840e569c23e39066/master/w_2560%2Cc_limit/Wright-Panda01.jpg",
    "https://media.newyorker.com/photos/5f414de2840e569c23e39066/master/w_2560%2Cc_limit/Wright-Panda01.jpg",
    "https://media.newyorker.com/photos/5f414de2840e569c23e39066/master/w_2560%2Cc_limit/Wright-Panda01.jpg"
];

const sliderWidth = viewPortWidth;
const sideWidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sideWidth + wp(2) * 2;

class Carousel extends React.Component {
    renderItem = ({item}: {item: string}, parallaxProps?: AdditionalParallaxProps)  => {
        return (
            //<Text>Example Text</Text>
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