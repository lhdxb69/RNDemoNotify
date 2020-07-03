import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    //console.log('XXX ComponentDidMount');
  }

  componentWillUnmount() {
    //console.log('XXX ComponentWillUnmount');
  }

  render() {
    //console.log('XXX Render');
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, padding: 10}}>
          <Text style={{fontSize: 20, color: '#1AD1D1'}}>{this.props.route.params.type}</Text>
          <Text style={{fontWeight: 'bold', marginTop: 20}}>Time:</Text>
          <Text style={{color: 'gray'}}>{this.props.route.params.time}</Text>
          <Text style={{fontWeight: 'bold', marginTop: 20}}>Content:</Text>
          <Text style={{color: 'gray'}}>{this.props.route.params.content}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
};