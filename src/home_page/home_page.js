import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  StyleSheet,
  Picker
} from 'react-native';

export default class home_page extends Component {
  constructor() {
    super()
    this.state={
      word: '',
      loading: false,
      goForRequest: false,
      translatedWord: '',
      language: 'en'
    }
}
checkLoading = () => {
  if(!this.state.loading) {
    return <View style={styles.translateViewStyle}>
      <Text style={styles.translatedWordHint}>Word</Text>
      <Text style={styles.translatedWord}>{this.state.word}</Text>
      <Text style={styles.translatedWordHint}>Translated</Text>
      <Text style={styles.translatedWord}>{this.state.translatedWord}</Text>
    </View>;
  } else {
    return <View style={styles.progressStyle}>
      <Text>Loading</Text>
    </View>;
  }
}
translate = () => {
  this.setState({
    loading: true
  });
    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200421T205214Z.1ee43d1cd285474c.956ae4b1f7672df24a37bef55cdaa2edef30c856&lang='+this.state.language+'&text=' + this.state.word)
      .then((response) => response.json())
      .then((responseJson) => {
        var translatedWord = responseJson.text;
        this.setState({translatedWord, loading: false});
      })
      .catch((error) => {
        this.setState({loading: false});
        Alert.alert('Something Went Wrong');
      });
  }
render(){
  return (    
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>           
          <Picker
            selectedValue={this.state.language}
            onValueChange={(lang) => this.setState({language: lang})}>
            <Picker.Item label="Turkish" value="tr" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="Chineese" value="zh" />
            <Picker.Item label="Nepali" value="ne" />

          </Picker>
            <View>
                <TextInput style={styles.TextInput}
                numberOfLines={5}
                multiline={true}
                style={{ height: 120, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(word) => this.setState({word})}
                value={this.state.word}
                />
            </View>
            <View style={styles.ButtonArea}>
                <Button
                    title="Translate"
                    color='#258d7d'
                    onPress={this.translate}
                />
            </View>
            {this.checkLoading()}
          </View>
        </ScrollView>
 
  
  );
}
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
       
    },
    linearGradient: {
        flex: 1, 
        padding:20 
    },
    TextInput:{
        borderWidth:2,
        height:200,
        fontSize: 20,
        
    },
    ButtonArea:{
        marginTop:20,
       
               
    },
    Label:{
        marginTop:20,
       
    },
    Text:{
        textAlign:'center',
        fontSize: 20,
    } ,
    translateViewStyle: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    translatedWordHint: {
      fontSize: 18,
      color: 'grey',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 20,
    },
    translatedWord: {
      fontSize: 20,
      color: 'green',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    progressStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});