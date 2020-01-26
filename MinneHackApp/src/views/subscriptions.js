import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Statusbar from '../components/statusbar.js';
import { getSubscriptions, addSubscription, removeSubscription } from '../api';

export default class SubscriptionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            my_subs: [],
            options: [],
        }
    }

    componentDidMount() {
        this.subs = [
          this.props.navigation.addListener('didFocus', this.componentDidFocus),
          this.props.navigation.addListener('willBlur', this.componentWillBlur),
        ];
    }

    componentWillUnmount() {
      this.subs.forEach(sub => sub.remove());
    }

    reloadSubscriptions = () => {
        let username = global.username ? global.username : 'test';
        getSubscriptions(username).then(
            (res) => {
                this.setState({
                    my_subs: res.data.my_subscriptions,
                    options: res.data.options,
                })
            },
            (err) => {
                console.log("Error getting subs");
            }
        );
    }

    componentDidFocus = () => {
        if (this.state.options.length >= 0) {
            this.reloadSubscriptions();
        }
    }

    componentWillBlur = () => {

    }

    toggleSubscription = (option, subscribed) => {
        console.log(option, subscribed);
        if (subscribed) {
            removeSubscription(global.username, option).then(
                (res) => {
                    console.log(res);
                    this.reloadSubscriptions()
                },
                (err) => {
                    console.log('Error removing subscription');
                }
            );
        } else {
            addSubscription(global.username, option).then(
                (res) => {
                    this.reloadSubscriptions()
                },
                (err) => {
                    console.log('Error adding subscription');
                }
            );
        }
    }

    renderSubs = () => {
        return this.state.options.map((option) => {
            const subscribed = this.state.my_subs.indexOf(option) >= 0;
            let bgColor = 'rgba(100,200,100,0.2)';
            let icon = 'add';
            if (subscribed) {
                return (
                    <View key={option} style={styles.subOptionActive}>
                        <Text style={{flex:1}}>{option}</Text>
                        <TouchableOpacity
                            onPress={() => this.toggleSubscription(option, subscribed)}
                            style={styles.icon}
                        >
                            <Icon name={'close'} size={30}/>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    <View key={option} style={styles.subOption}>
                        <Text style={{flex:1}}>{option}</Text>
                        <TouchableOpacity
                            onPress={() => this.toggleSubscription(option, subscribed)}
                            style={styles.icon}
                        >
                            <Icon name={'add'} size={30}/>
                        </TouchableOpacity>
                    </View>
                );
            }
        });
    }

    render() {
        return (
            <View style={styles.background}>
                <Statusbar/>
                <Text style={styles.title}>Subscriptions</Text>
                <ScrollView style={{flex:1}}>
                    {this.renderSubs()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    title: {
        flex: 1,
        fontSize: 24,
    },
    subOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 50,
        borderWidth: 2,
        padding: 10,
    },
    subOptionActive: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 50,
        borderWidth: 2,
        padding: 10,
        backgroundColor: 'rgba(100,200,100,0.6)',
    },
    icon: {
        alignSelf: 'flex-end',
        width: 40,
    }

})
