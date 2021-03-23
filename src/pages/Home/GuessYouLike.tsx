import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Alert} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import { TouchableOpacity } from 'react-native';
import { IGuessYouLikeImage } from '@/models/home';

const mapStateToProps = ({home} : RootState) => {
    return {
        guessImages: home.guessImages,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class GuessYouLike extends React.Component<ModelState> {
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
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    alert('haha');
                }}>
                <Image source={{uri: item.imageURL}} style={styles.image} />
                <Text numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const {guessImages} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={3}
                    data={guessImages}
                    renderItem={this.renderItem}
                />
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
});

export default connector(GuessYouLike);