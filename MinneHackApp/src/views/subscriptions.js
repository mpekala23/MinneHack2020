import * as React from 'react';
import { View, Text } from 'react-native';
import Statusbar from '../components/statusbar.js';

export default class SubscriptionsScreen extends React.Component {
    render() {
        return (
            <View>
                <Statusbar/>
                <Text>Subscriptions</Text>
            </View>
        )
    }
}
