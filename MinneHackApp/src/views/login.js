import * as React from 'react';
import { View, Text, TextInput, Keyboard, KeyboardAvoidingView,
    TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
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
                style={{flex:1, justifyContent: 'space-evenly'}}
                onPress={() => {
                    Keyboard.dismiss();
                }}
                activeOpacity={1.0}
            >
                <Statusbar/>
                <Text style={styles.header}>Login</Text>
                <Input
                  style={styles.bod}
                  placeholder='Username'
                  onChangeText={this.onChangeUsername}
                  value={this.state.username}
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                />
                <Input
                  style={styles.bod}
                  placeholder='Password'
                  onChangeText={this.onChangePassword}
                  value={this.state.password}
                  leftIcon={{ type: 'font-awesome', name: 'lock' }}
                />

                <Button
                  onPress={this.submit}
                  title="Sign In"
                />
                <Button
                  onPress={() => navigate('Register')}
                  title="Register"
                />
              {/*}<TouchableOpacity onPress={() => navigate('Register')}>
                  <Text>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.submit}>
                  <Text>Log in</Text>
              </TouchableOpacity>*/}
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    header: {
      flex: 0.1,
      justifyContent: 'center',
      fontSize: 50,
      fontWeight: 'bold',
      left: 10
    },
    label: {
      fontSize: 20,
    },
});
