/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import SocketIOClient from 'socket.io-client';
var $this;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://192.168.211.174:3000');
    $this = this;
    this.socket.on('update', function (data) {
      console.log(data);      
      $this.setState({"datatext": data.name});
    });
    this.state = {
      "data" : "null",
      "datatext": "null"
    }
  }
  componentDidMount(){
    
  }
  // _SendToServer(){
  //   alert("hi");
  //   this.socket.emit('client', {'id':2, 'name':Math.random().toString(36).substr(2, 5)+' come from client'});
  // }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.datatext}</Text>
        
        <TouchableOpacity onPress={()=>{alert('hi'); this.socket.emit('client', {'id':2, 'name':Math.random().toString(36).substr(2, 5)+' come from client'}) }}>
            <Text>
            Click this send to server
            </Text>
        </TouchableOpacity>

        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
