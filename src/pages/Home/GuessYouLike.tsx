import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

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

    renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Image source={{uri: item.imageURL}} style={styles.image} />
                <Text numberOfLines={2}>{item.title}</Text>
            </View>
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