import { IChannel } from '@/models/home';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';

interface IProps {
    data: IChannel;
    onPressHandler: (data: IChannel) => void;
}

class ChannelItem extends React.PureComponent<IProps> {
    onPress= () => {
        const {onPressHandler, data} = this.props;
        if (typeof onPressHandler === 'function') {
            onPressHandler(data);
        }
    }

    render() {
        const { data } = this.props;
        return (
            <Touchable onPress={this.onPress}>
                <View style={styles.container}>
                    <Image source={{ uri: data.imageURL }} style={styles.image} />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                        <Text style={styles.remark} numberOfLines={2}>{data.remark}</Text>
                        <View style={styles.historyCount}>
                            <View style={styles.playedCount}>
                                <IconFont name="icon-user" size={14} />
                                <Text style={styles.countNum}>{data.played_count}</Text>
                            </View>
                            <View style={styles.playingCount}>
                                <IconFont name="icon-user" size={14} />
                                <Text style={styles.countNum}>{data.playing_count}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    image: {
        marginRight: 10,
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#dedede',
    },

    rightContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
    },
    remark: {
        backgroundColor: '#f8f8f8',
        padding: 5,
        marginBottom: 5,
    },
    historyCount: {
        flexDirection: 'row',
    },
    playedCount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    playingCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countNum: {
        marginLeft: 5,
    }
});

export default ChannelItem;