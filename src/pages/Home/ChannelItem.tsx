import { IChannel } from '@/models/home';
import React from 'react';
import { View, Text } from 'react-native';

interface IProps {
    data: IChannel
}

class ChannelItem extends React.Component<IProps> {
    render() {
        return (
            <View>
                <Text>ChannelItem</Text>
            </View>
        );
    }
}

export default ChannelItem;