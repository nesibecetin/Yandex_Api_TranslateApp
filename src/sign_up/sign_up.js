import React, { Component } from 'react';
import {View,Text,Image,StyleSheet,TextInput, Button,KeyboardAvoidingView} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fumi } from 'react-native-textinput-effects';
import database from '../../config.js'

export default class sign_up extends Component {
  constructor(props) {
    super(props)
    this.state={
        displayName:'',
        mail:'',
        password:'',
        isLoading: false,
      
    }
}
updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.mail === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
        
      })
      database
      .auth()
      .createUserWithEmailAndPassword(this.state.mail, this.state.password)
      .then((res) => {
        res.user.updateProfile({
            displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          username: '',
          mail: '', 
          password: ''
        })
        this.props.navigation.navigate('Sign_in')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }
  render() {
    return (		
        <View style={styles.Container}>
		    <LinearGradient colors={['#2ba18f', '#155148', '#051412']} style={styles.linearGradient}>
                <KeyboardAvoidingView behavior="padding" style={styles.Container}>      
                    <View style={styles.Logo}></View>
                    <View style={styles.Form}>
                        
                        <Fumi style={styles.Input}
                        label={'Name'}
                        iconClass={FontAwesomeIcon}
                        labelStyle={{ color: 'rgba(230,230,230,0.6)' ,fontSize: 14,}}
                        inputStyle={{ color: 'rgba(250,250,250,1)' ,fontSize: 17, }}
                        iconName={'user-plus'}
                        iconColor={'#fff'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={this.state.displayName}
                        onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                        />
                      
                      

                        <Fumi style={styles.Input}
                        label={'Email'}
                        iconClass={MaterialCommunityIcons}
                        labelStyle={{ color: 'rgba(230,230,230,0.6)' ,fontSize: 14,}}
                        inputStyle={{ color: 'rgba(250,250,250,1)' ,fontSize: 17, }}
                        iconName={'email'}
                        iconColor={'#fff'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={this.state.mail}
                        onChangeText={(val) => this.updateInputVal(val, 'mail')}
                        
                        />

                        <Fumi style={styles.Input}
                        label={'Password'}
                        labelStyle={{ color: 'rgba(230,230,230,0.6)' ,fontSize: 14,}}
                        inputStyle={{ color: 'rgba(250,250,250,1)' ,fontSize: 17, }}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={'#fff'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={this.state.password}
                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                        secureTextEntry
                        />
                     
                        <View style={styles.ButtonArea}>
                            <Button
                                title="Sign up"
                                color='#258d7d'
                                onPress={() => this.registerUser()}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView> 
            </LinearGradient>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    flexDirection: 'column',  
  },

  Logo:{
    flex:1,
  },
  Form:{
    flex:4,
    padding:20

  },
  Input:{
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign:'center',
    marginTop:10,
    backgroundColor: 'rgba(250,250,250,0.1)',
    borderRadius:5
  },
  ButtonArea:{
    marginTop:20,
    width:150,
    alignSelf: 'flex-end',   
  },
});