import * as React from 'react';
import { View, Text, TextInput, Keyboard, KeyboardAvoidingView,
    TouchableOpacity, StyleSheet, Button } from 'react-native';
import { checkLogin } from '../api';
import Statusbar from '../components/statusbar.js';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    onChangeUsername = (newText) => {
        this.setState({
            username: newText,
        });
    }

    onChangePassword = (newText) => {
        this.setState({
            password: newText,
        });
    }

    submit = () => {
        checkLogin(this.state.username, this.state.password).then(
            (res) => {
                if (res.data.status) {
                    global.username = this.state.username;
                    this.props.navigation.navigate('App');
                } else {
                    alert('Incorrect username/password.');
                }
            },
            (err) => {
                console.log("Error checking login");
                console.log(err);
            }
        )
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity
                style={{flex:1, justifyContent: 'space-around'}}
                onPress={() => {
                    Keyboard.dismiss();
                }}
                activeOpacity={1.0}
            >
                <Statusbar/>
                <Text style={styles.header}>Login</Text>
                <View style={styles.inputField}>
                    <Text style={styles.inputLabel}>Username: </Text>
                    <TextInput
                        style={styles.inputSpace}
                        onChangeText={this.onChangeUsername}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.inputLabel}>Password:  </Text>
                    <TextInput
                        style={styles.inputSpace}
                        onChangeText={this.onChangePassword}
                        value={this.state.password}
                    />
                </View>
                <TouchableOpacity onPress={this.submit}>
                    <Text>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Register')}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    header: {
      flex: 0.4,
      justifyContent: 'center',
      fontSize: 50,
      left: 10
    },
    inputField: {
        flexDirection: 'row',
    },
    inputSpace: {
        flex: 1,
        height: 25,
        borderWidth: 1,
        margin: 4,
        borderRadius: 5,
    }
});
