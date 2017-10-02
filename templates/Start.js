import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50}}>Hello GOTO</Text>
        <Text style={{fontSize: 30}}>Max - @benjick</Text>
      </View>
    );
  }
}
