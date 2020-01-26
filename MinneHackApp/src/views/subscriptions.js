import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl,
    Image } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Statusbar from '../components/statusbar.js';
import { getSubscriptions, addSubscription, removeSubscription } from '../api';

export default class SubscriptionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            my_subs: [],
            options: [],
            loading: false,
            sending: [],
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
        if (this.state.loading) {
            return;
        }
        this.setState({loading:true});
        let username = global.username ? global.username : 'test';
        getSubscriptions(username).then(
            (res) => {
                this.setState({
                    my_subs: res.data.my_subscriptions,
                    options: res.data.options,
                    loading: false,
                })
            },
            (err) => {
                this.setState({loading: false,})
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
        if (this.state.sending.indexOf(option) >= 0) {
            return;
        }
        this.setState({sending: [...this.state.sending, option]})
        if (subscribed) {
            removeSubscription(global.username, option).then(
                (res) => {
                    let newSubs = [...this.state.my_subs];
                    let ix = newSubs.indexOf(option);
                    newSubs.splice(ix,1);
                    let newSending = [...this.state.sending];
                    let jx = newSending.indexOf(option);
                    newSending.splice(jx,1);
                    this.setState({
                        my_subs: newSubs,
                        sending: newSending,
                    });
                },
                (err) => {
                    console.log('Error removing subscription');
                    let newSending = [...this.state.sending];
                    let jx = newSending.indexOf(option);
                    newSending.splice(jx,1);
                    this.setState({
                        sending: newSending,
                    });
                }
            );
        } else {
            addSubscription(global.username, option).then(
                (res) => {
                    let newSubs = [...this.state.my_subs];
                    newSubs.push(option);
                    let newSending = [...this.state.sending];
                    let jx = newSending.indexOf(option);
                    newSending.splice(jx,1);
                    this.setState({
                        my_subs: newSubs,
                        sending: newSending,
                    });
                },
                (err) => {
                    console.log('Error adding subscription');
                    let newSending = [...this.state.sending];
                    let jx = newSending.indexOf(option);
                    newSending.splice(jx,1);
                    this.setState({
                        sending: newSending,
                    });
                }
            );
        }
    }

    renderOptionIcon = (option, subscribed) => {
        if (subscribed) {
            if (this.state.sending.indexOf(option) >= 0) {
                return (
                    <Image
                      style={{width: 24, height: 24}}
                      source={require('../assets/loading.gif')}
                    />
                );
            } else {
                return (
                    <TouchableOpacity
                      onPress={() => this.toggleSubscription(option, subscribed)}
                    >
                        <Icon
                           name='close'
                           type='ion-icon'
                           color='#ffffff'
                        />
                    </TouchableOpacity>
                )
            }
        } else {
            if (this.state.sending.indexOf(option) >= 0) {
                return (
                    <Image
                      style={{width: 24, height: 24}}
                      source={require('../assets/loading.gif')}
                    />
                );
            } else {
                return (
                    <TouchableOpacity
                      onPress={() => this.toggleSubscription(option, subscribed)}
                    >
                        <Icon
                           name='add-circle-outline'
                           type='ion-icon'
                           color='#00e78b'
                        />
                    </TouchableOpacity>
                );
            }
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
                      leftIcon={() => this.renderOptionIcon(option,subscribed)}
                      bottomDivider
                    />
                );
            } else {
                return (
                    <ListItem
                      key={option}
                      title={option}
                      style={styles.subOption}
                      leftIcon={() => this.renderOptionIcon(option, subscribed)}
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
                <ScrollView
                    style={{flex:1}}
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.reloadSubscriptions}
                            refreshing={this.state.loading}
                        />
                    }
                >
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
