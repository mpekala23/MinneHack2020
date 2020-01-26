import * as React from 'react';
import { View, StatusBar } from 'react-native';

export default class Statusbar extends React.Component {
    render() {
        return (
            <View style={{height:25}}>
                <StatusBar barStyle='dark-content'/>
            </View>
        )
    }
}
