import React, { Component } from 'react';
import {View,Text,Image,StyleSheet,TextInput,Button,KeyboardAvoidingView } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import database from '../../config.js'
export default class sign_in extends Component {
  constructor(props) {
    super(props)
    this.state={
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

  userLogin = () => {
    if(this.state.mail === '' && this.state.password === '') {
      Alert.alert('Boş geçilemez.')
    } else {
      this.setState({
        isLoading: true,
      })
      database
      .auth()
      .signInWithEmailAndPassword(this.state.mail, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('Giriş Başarılı')
        this.setState({
          isLoading: false,
          mail: '', 
          password: ''
        })
        this.props.navigation.navigate('Home')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    return (		
      <View style={styles.Container}>
			  <LinearGradient colors={['#20796c', '#155148', '#051412']} style={styles.linearGradient}> 
        <KeyboardAvoidingView behavior="padding" style={styles.Container}>      
          <View style={styles.Logo}></View>
          <View style={styles.Form}>
            <Fumi style={styles.Input}
              label={'Username or Email'}
              iconClass={Icon}
              labelStyle={{ color: 'rgba(230,230,230,0.6)' ,fontSize: 14,}}
              inputStyle={{ color: 'rgba(250,250,250,1)' ,fontSize: 17, }}
              iconName={'user'}
              iconColor={'#fff'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={(val) => this.updateInputVal(val, 'mail')}
              value={this.state.mail}
            />
             
            <Fumi style={styles.Input}
              label={'Password'}
              labelStyle={{ color: 'rgba(230,230,230,0.6)' ,fontSize: 14,}}
              inputStyle={{ color: 'rgba(250,250,250,1)' ,fontSize: 17, }}
              iconClass={Icon}
              iconName={'key'}
              iconColor={'#fff'}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              value={this.state.password}
              secureTextEntry
            />
            <View style={styles.ButtonArea}>
              <Button
                title="Sign in"
                color='#258d7d'
                onPress={() => this.userLogin()}
              />
            </View>
            <Text 
             style={styles.loginText}
             onPress={() => this.props.navigation.navigate('Sign_up')}>
             Click here to Sign_up
            </Text>      
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
    flex:4,
  },
  Form:{
    flex:3,
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
  loginText:{
    color:'#fff',
  }
});