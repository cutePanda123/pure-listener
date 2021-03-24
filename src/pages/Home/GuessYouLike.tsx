import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Alert} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Touchable from '@/components/Touchable';
import { IGuessYouLikeImage } from '@/models/home';
import IconFont from '@/assets/iconfont';

const mapStateToProps = ({home} : RootState) => {
    return {
        guessImages: home.guessImages,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class GuessYouLike extends React.PureComponent<ModelState> {
    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'home/fetchGuessImages',
        });
    }

    renderItem = ({item}: {item: IGuessYouLikeImage}) => {
        return (
            <Touchable
                style={styles.item}
                onPress={() => {
                    console.log('haha');
                }}>
                <Image source={{uri: item.imageURL}} style={styles.image} />
                <Text numberOfLines={2}>{item.title}</Text>
            </Touchable>
        );
    }

    render() {
        const {guessImages} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <IconFont name="icon-like" />
                        <Text style={styles.headerTitle}>Guess You Like</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.headerMore}>More</Text>
                        <IconFont name="icon-more" />
                    </View>
                </View>
                <FlatList
                    style={styles.imageList}
                    numColumns={3}
                    data={guessImages}
                    renderItem={this.renderItem}
                />
                <Touchable
                    style={styles.seeMore}
                    onPress={() => {this.fetch()}}>
                    <IconFont name='icon-exchangerate' color='red' />
                    <Text style={styles.seeMoreText}>See More</Text>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
    },
    item: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 6,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomColor: '#efefef',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        marginLeft: 5,
        color: '#333',
    },
    headerMore: {
        color: '#6f6f6f',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    seeMoreText: {
        marginLeft: 5,
    },
    imageList: {
        padding: 10,
    },
});

export default connector(GuessYouLike);