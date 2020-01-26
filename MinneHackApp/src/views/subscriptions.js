import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
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
                    <ListItem
                      key={option}
                      title={option}
                      titleStyle={{ color: 'white', fontWeight: 'bold' }}
                      style={styles.subOption}
                      linearGradientProps={{
                        colors: ['#00e78b','#00d0e7'],
                        start: [1, 0],
                        end: [0.2, 0],
                      }}
                      leftIcon={<Icon
                         name='close'
                         type='ion-icon'
                         color='#ffffff'
                         onPress={() => this.toggleSubscription(option, subscribed)}
                        />}
                      bottomDivider
                    />
                );
            } else {
                return (
                    <ListItem
                      key={option}
                      title={option}
                      style={styles.subOption}
                      leftIcon={<Icon
                         name='add-circle-outline'
                         type='ion-icon'
                         color='#00e78b'
                         onPress={() => this.toggleSubscription(option, subscribed)}
                        />}
                      bottomDivider
                    />
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
        fontSize: 24,
        justifyContent: 'center',
        fontWeight: 'bold',
        margin: 10,
        alignSelf: 'center'
    },

})
