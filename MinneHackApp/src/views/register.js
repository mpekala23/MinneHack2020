import * as React from 'react';
import { View, Text, TextInput, Keyboard, KeyboardAvoidingView,
    TouchableOpacity, Button, StyleSheet } from 'react-native';
import { registerUser } from '../api';
import Statusbar from '../components/statusbar.js';

export default class SubscriptionsScreen extends React.Component {
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
        registerUser(this.state.username, this.state.password).then(
            (res) => {
                if (res.data.status) {
                    this.props.navigation.navigate('App');
                } else {
                    alert('Unable to register');
                }
            },
            (err) => {

            }
        )
    }

    render() {
        return (
            <View
              style={{flex:1, justifyContent: 'space-evenly'}}
              onPress={() => {
                  Keyboard.dismiss();
                }}
                activeOpacity={1.0}
            >
                <Statusbar/>
                <Text style = {styles.intro}>Sign up to see the hottest bills trending in your area.</Text>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        style={styles.inputSpace}
                        onChangeText={this.onChangeUsername}
                    />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.inputSpace}
                        onChangeText={this.onChangePassword}
                    />
                </View>
                <Button
                  onPress={this.submit}
                  title="Submit"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.4,
    fontSize: 50,
    fontWeight: 'bold',
    left: 4
  },
  inputField: {
    flexDirection: 'column',
    margin: 4,
  },
  inputSpace: {
    height: 25,
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontSize: 20,
  },
  intro: {
    flex: 0.3,
    fontSize: 36,
    alignSelf: 'center',
    margin: 8
  },
});
