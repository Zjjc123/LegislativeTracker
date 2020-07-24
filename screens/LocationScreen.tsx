import * as React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Keyboard, FlatList, Linking, ActivityIndicator} from 'react-native';
import {ListItem, Input} from 'react-native-elements';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-community/async-storage';

interface stateType{
  address: string,
  compiled: {[key: string]:string}[] | null,
  loaded: boolean,
  error: string | null
}

export default class LocationScreen extends React.Component<{}, stateType>{

  constructor(props: any){
    super(props);
    this.state = {
      address: '',
      compiled: null,
      loaded: false,
      error: null
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('address');
      if(value !== null) {
        this.setState({address: value});
      } else {
      }

      if (this.state.address != '') {
        this.getAPI();
      } else {
        this.setState({loaded: true});
      }
    } catch(e) {
    }
  }

  save = async () => {
    try {
      await AsyncStorage.setItem('address', this.state.address);
    } catch (e) {
    }

    Keyboard.dismiss();
    this.setState({loaded: false})
    this.getAPI();
  }

  getAPI = () => {

    let url = 'https://www.googleapis.com/civicinfo/v2/representatives';
    url += '?key=AIzaSyDiWR5foAY1W2ydEXO5XDA63T4gipAHtjM';
    url += '&address=';
    url += this.state.address;
    url += '&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody'

    fetch(url)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.error)
  }

  showData = (data: any) => {

    if (data.error != undefined) {
      this.setState({error: data.error.message});
      this.setState({compiled: null});
    }

    else {
      let officials = data.officials;

      let compiled = [];

      for (let i = 0; i < officials.length; i++){
        compiled[i] = {
          name: officials[i].name,
          photo: officials[i].photoUrl,
          phone: officials[i].phones[0],
          website: officials[i].urls[0],
          icon: "launch"
        }

        // @ts-ignore
        compiled[i].title = (i < 2) ? "Senator" : "Representative";
      }

      this.setState({compiled: compiled});
      this.setState({error: null});
    }

    this.setState({loaded: true});
  }

  error = (err: { message: any; }) => {
    this.setState({error: err.message});
  }

  render() {

    return (
        <View style={styles.container}>

          <View style={styles.center}>

            <Input inputStyle={styles.textInput}
                       placeholder="Input Your Address"
                       autoCapitalize="none"
                       onChangeText={address => this.setState({address})}>{this.state.address}</Input>

            <TouchableOpacity style={styles.button} onPress={this.save}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            {!this.state.loaded && (
                <ActivityIndicator/>
            )}

            {this.state.error != null && (
                <Text style={styles.errorText}>{this.state.error}</Text>
            )}
          </View>

          <View style={{marginTop: 10}}>
            {
              this.state.compiled != null &&
              (this.state.compiled.map((l, i) => (
                  <ListItem
                      key={i}
                      leftAvatar={{ source: { uri: l.photo } }}
                      title={l.title + " " + l.name}
                      subtitle={l.phone}
                      onPress={() => Linking.openURL(l.website)}
                      bottomDivider
                      rightIcon={{ name: l.icon }}
                  />
              )))
            }
          </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  container:{
    flex: 1,
  },
  title: {
    marginVertical: 20,
    fontSize: 20
  },
  textInput: {
    height: 60,
    fontSize: 18,
    marginTop: 10
  },
  button: {
    marginHorizontal: 30,
    borderRadius: 4,
    height: 52,
    width: '50%',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#385D6E"
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  errorText:{
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  }
});
