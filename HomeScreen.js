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
  Picker,
  FlatList,
  Alert,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      id: '',
      pass: '',
      notifyType: 'Notification type A',
      notifyContent: '',
      typeA: [
        {
          time: '2020.6.3 11:21',
          content: 'Hihi',
          readed: false,
        }, {
          time: '2020.6.3 10:32',
          content: 'Hehe',
          readed: false,
        }, {
          time: '2020.6.3 9:53',
          content: 'Hixhix',
          readed: true,
        }, {
          time: '2020.6.3 8:43',
          content: 'ZZZZzzzzzzz',
          readed: true,
        },
      ],
      typeB: [
        {
          time: '2020.6.3 12:29',
          content: 'Clo',
          readed: false,
        }, {
          time: '2020.6.3 11:32',
          content: 'Blo',
          readed: true,
        }, {
          time: '2020.6.3 09:07',
          content: 'Alo',
          readed: true,
        }, {
          time: '2020.6.3 08:58',
          content: 'XXX',
          readed: false,
        },
      ],
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
        {this.state.logged === false ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
            placeholder='Write "Demo"'
            value={this.state.id}
            onChangeText={text => this.setState({id: text})}
          />
          <TextInput
            style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', marginTop: 10}}
            placeholder='Write "123456"'
            secureTextEntry={true}
            value={this.state.pass}
            onChangeText={text => this.setState({pass: text})}
          />
          <TouchableOpacity
            style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#1AD1D1', marginHorizontal: 100, marginTop: 10}}
            onPress={() => {
              if (this.state.id === 'Demo' && this.state.pass === '123456') {
                this.setState({logged: true});
              } else {
                Alert.alert(
                  "Login fail",
                  "ID or password is invalid",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    }
                  ],
                  { cancelable: true }
                );
              }
            }}
          >
            <Text style={{color: 'white', textAlign: 'center', marginTop: 8}}>Login</Text>
          </TouchableOpacity>
        </View> : <ScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Text>Fake Notification</Text>
            <Picker
              style={{width: 200}}
              selectedValue={this.state.notifyType}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({notifyType: itemValue});
              }}
            >
              <Picker.Item label="Notification type A" value="Notification type A" />
              <Picker.Item label="Notification type B" value="Notification type B" />
            </Picker>
            <TextInput
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
              placeholder='Content'
              value={this.state.notifyContent}
              onChangeText={text => this.setState({notifyContent: text})}
            />
            <Button
              title="Send"
              onPress={() => {
                if (this.state.notifyContent !== '') {
                  var crrTime = new Date();
                  if (this.state.notifyType === 'Notification type A') {
                    this.state.typeA.unshift({
                      time: crrTime.getFullYear() + '.' + crrTime.getMonth() + '.' + crrTime.getDate() + ' ' + crrTime.getHours() + ':' + crrTime.getMinutes(),
                      content: this.state.notifyContent,
                      readed: false,
                    });
                    this.setState({
                      notifyContent: '',
                      typeA: this.state.typeA
                    });
                  } else if (this.state.notifyType === 'Notification type B') {
                    this.state.typeB.unshift({
                      time: crrTime.getFullYear() + '.' + crrTime.getMonth() + '.' + crrTime.getDate() + ' ' + crrTime.getHours() + ':' + crrTime.getMinutes(),
                      content: this.state.notifyContent,
                      readed: false,
                    });
                    this.setState({
                      notifyContent: '',
                      typeB: this.state.typeB
                    });
                  }
                }
              }}
            />
          </View>
          <View style={{marginTop: 30, padding: 10}}>
            <Text style={{fontSize: 20, color: '#1AD1D1'}}>Notification type A</Text>
            <FlatList
              data={this.state.typeA}
              renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => {
                  var index = this.state.typeA.indexOf(item);
                  this.state.typeA[index].readed = true;
                  this.setState({typeA: this.state.typeA});

                  this.props.navigation.navigate('Details', {
                    type: 'Notification type A',
                    time: item.time,
                    content: item.content
                  });
                }}
              >
                {item.readed ?
                <View style={{flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1, paddingVertical: 5}}>
                  <Text style={{width: 110}} numberOfLines={1}>{item.time}</Text>
                  <Text>{' : '}</Text>
                  <Text numberOfLines={1}>{item.content}</Text>
                </View> : <View style={{flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1, paddingVertical: 5, backgroundColor: 'pink'}}>
                  <Text style={{width: 110}} numberOfLines={1}>{item.time}</Text>
                  <Text>{' : '}</Text>
                  <Text numberOfLines={1}>{item.content}</Text>
                </View>}
              </TouchableOpacity>}
            />
          </View>
          <View style={{marginTop: 30, padding: 10}}>
            <Text style={{fontSize: 20, color: '#1AD1D1'}}>Notification type B</Text>
            <FlatList
              data={this.state.typeB}
              renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => {
                  var index = this.state.typeB.indexOf(item);
                  this.state.typeB[index].readed = true;
                  this.setState({typeB: this.state.typeB});

                  this.props.navigation.navigate('Details', {
                    type: 'Notification type B',
                    time: item.time,
                    content: item.content
                  });
                }}
              >
                {item.readed ?
                <View style={{flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1, paddingVertical: 5}}>
                  <Text style={{width: 110}} numberOfLines={1}>{item.time}</Text>
                  <Text>{' : '}</Text>
                  <Text numberOfLines={1}>{item.content}</Text>
                </View> : <View style={{flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1, paddingVertical: 5, backgroundColor: 'pink'}}>
                  <Text style={{width: 110}} numberOfLines={1}>{item.time}</Text>
                  <Text>{' : '}</Text>
                  <Text numberOfLines={1}>{item.content}</Text>
                </View>}
              </TouchableOpacity>}
            />
          </View>
        </ScrollView>}
      </SafeAreaView>
    );
  }
};