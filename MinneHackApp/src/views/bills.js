import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { Icon } from 'react-native-elements'
import { getBills, vote } from '../api';
import Statusbar from '../components/statusbar.js';

export default class BillsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            loading: false,
        }
    }

    loadBills = () => {
        if (this.state.loadin) {
            return;
        }
        this.setState({
            loading: true,
        });
        getBills(global.username).then(
            (res) => {
                this.setState({
                    bills: res.data.bills,
                    loading: false,
                });
            },
            (err) => {
                this.setState({
                    loading: false,
                });
            }
        );
    }

    componentDidMount() {
        this.loadBills();
    }

    renderBills = () => {
        return this.state.bills.map((bill) => {
            return (
                <Card style={styles.card} key={bill.id}>
                    <Text style={styles.label}>{bill.id}</Text>
                    <Text>Topic: {bill.topic}</Text>
                    <Text>Author: {bill.author}</Text>
                    <Text>Summary: {bill.summary}</Text>
                    <Text>Body: {bill.body}</Text>
                    <Text>Last Action: {bill.last_action}</Text>
                    <Text>Upvotes: {bill.upvotes}</Text>
                    <Text>Downvotes: {bill.downvotes}</Text>
                </Card>
            );
        });
    }

    onSwipedRight = (ix) => {
        vote(this.state.bills[ix]['id'],1,global.username).then(
            (res) => {
                console.log('voted');
            },
            (err) => {
                console.log('error voting');
            }
        );
    }

    onSwipedLeft = (ix) => {
        vote(this.state.bills[ix]['id'],-1,global.username).then(
            (res) => {
                console.log('voted');
            },
            (err) => {
                console.log('error voting');
            }
        );
    }

    renderNoMoreCards = () => {
        return (
            <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>
                No more bills :(
            </Text>
        );
    }

    loadingStatus = () => {
        if (this.state.loading) {
            return (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../assets/loading.gif')}
                />
            );
        } else {
            return <View style={{width: 50, height: 50}}/>
        }
    }

    render(){
      return (
        <View style={{ flex: 1, alignItems: 'center'}}>
          <Statusbar/>
          <Text style={styles.title}>Hot Bills</Text>
          {this.loadingStatus()}
          <CardStack
            style={styles.content}
            renderNoMoreCards={this.renderNoMoreCards}
            ref={swiper => {
              this.swiper = swiper
            }}
            onSwipedRight={this.onSwipedRight}
            onSwipedLeft={this.onSwipedLeft}
          >
            {this.renderBills()}
          </CardStack>

          <View style={styles.footer}>
            <View style={styles.actionBar}>
              <TouchableOpacity style={styles.btnStyle} activeOpacity={0.5} onPress={() => {this.swiper.swipeRight(); }}>
                <Icon
                   reverse
                   name='ios-heart'
                   type='ionicon'
                   color='red'
                   size={40}
                  />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnStyle} activeOpacity={0.5} onPress={() => {this.swiper.swipeLeft(); }}>
                <Icon
                   reverse
                   name='ios-trash'
                   type='ionicon'
                   color='grey'
                   size={40}
                  />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnStyle}
                activeOpacity={0.5}
                onPress={this.loadBills}
              >
                <Icon
                   reverse
                   name='refresh'
                   color='green'
                   size={40}
                  />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  actionBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 350,
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  label: {
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#000000',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    marginBottom:0,
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  btnStyle:{
    marginLeft: 20,
    marginRight: 15,
  },
  title: {
      fontSize: 24,
      justifyContent: 'center',
      fontWeight: 'bold',
      margin: 10,
      alignSelf: 'center'
  },
});
