import React, { useLayoutEffect, useState, useEffect } from 'react'
import {
  View, Text, StyleSheet, Image, ImageBackground, Dimensions, KeyboardAvoidingView,
  keyboardVerticalOffset, TouchableWithoutFeedback, SafeAreaView, Keyboard
} from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Button } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import { strings } from '../languages/Localization';
import AsyncStorage from '@react-native-community/async-storage';
const window = Dimensions.get('window')
const EditProfile = ({ route, navigation }) => {
  const { params } = route
  const { usernames, email } = params
  const STORAGE_LANGUAGE_KEY = '@save_language'
  const STORAGE_USEREMAIL_KEY = '@save_useremail'
  const [language, setLanguage] = useState('')
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const { colors } = useTheme()
  const [enableShift, setEnableShift] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: strings.EditProfile
    })
  })
  useEffect(() => {
    getLanguage();
  })
  const getLanguage = async () => {
    try {
      const languageApp = await AsyncStorage.getItem(STORAGE_LANGUAGE_KEY);
      setLanguage(languageApp)
    } catch (err) {
      console.log(err)
    }
  }
  const EditProfile = async () => {
    try {
      const useremail = await AsyncStorage.getItem(STORAGE_USEREMAIL_KEY);
      if (useremail !== null) {
        console.log(useremail)
        db.transaction(function (tx) {
          tx.executeSql('UPDATE table_user set user_name = ? , user_email = ? where user_email = ? ', [username, userEmail, useremail],

            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log('User updated successfully')
                openMyProfile();
              } else alert('Updation Failed');
            })
        })

      }
    } catch (error) {
      console.log(error)
    }
  }
  const openMyProfile = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_USEREMAIL_KEY, userEmail).then(() => {
        navigation.replace('MyProfile');
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={enableShift}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', flex: 1 }}>



              <View style={styles.viewImgbg}>
                <ImageBackground style={styles.Image} imageStyle={{ borderRadius: 70 }}
                  source={require('../images/girl_wide_brim_hat.png')}>
                  <View style={styles.bgCamera}>
                    <Feather style={{ fontSize: 20, marginTop: 10 }}
                      color='#fff' name="camera" />
                  </View>
                </ImageBackground>
              </View>

              <View style={{ width: window.width }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Feather style={styles.icons} name="user" />
                  <Text style={{ fontSize: 18, color: '#F85F6A' }} >{strings.Name}</Text>
                </View>
                <TextInput style={[styles.TextInputs, { color: colors.text, textDecorationColor: colors.text }]}
                  selectionColor={colors.text} placeholderTextColor={colors.editText} placeholder="Asmaa"
                  onChangeText={text => setUsername(text)}
                />

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <FontAwesome style={styles.icons} name="envelope-o" />
                  <Text style={{ fontSize: 18, color: '#F85F6A' }} >{strings.Email}</Text>
                </View>
                <TextInput style={styles.TextInputs}
                  selectionColor={colors.text} placeholderTextColor={colors.editText}
                  placeholder="Asmaa123@gmail.com" onChangeText={text => setUserEmail(text)} />

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Feather style={styles.icons} name="phone" />
                  <Text style={{ fontSize: 18, color: '#F85F6A' }} >{strings.Phone}</Text>
                </View>
                <TextInput style={styles.TextInputs}
                  selectionColor={colors.text} placeholderTextColor={colors.editText} placeholder='+20 0109999655' />


                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <SimpleLineIcons style={styles.icons} name="location-pin" />
                  <Text style={{ fontSize: 18, color: '#F85F6A' }} >{strings.Location}</Text>
                </View>
                <TextInput style={styles.TextInputs}
                  selectionColor={colors.text} placeholderTextColor={colors.editText} placeholder='El Sharqia, Egypt' />


                <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                  <Feather style={[styles.accountIcon, { color: colors.text }]} name="facebook" />
                  <Text style={{ color: colors.text }}>{strings.Accountaddress}</Text>
                  <Feather style={[styles.accountIcon, { color: colors.text }]} name="instagram" />
                  <Text style={{ color: colors.text }}>{strings.Accountaddress}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>

                  <Text style={{ fontSize: 18, color: '#F85F6A', margin: 15 }} onPress={() => navigation.navigate('AddAccount')}>
                    {strings.AddOtherAccount}
                  </Text>

                  <Button style={styles.Button} uppercase={false} mode='contained' color='#111'
                    onPress={() => EditProfile()}>{strings.Update}</Button>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  view: {

  },
  header: {
    height: 250,
  },
  Image: {
    width: 140,
    height: 140,
    marginTop: 10,
    justifyContent: 'center'
  },
  icons: {
    fontSize: 25,
    marginRight: 30,
    marginLeft: 20,
    color: '#F85F6A'
  },
  TextInputs: { borderBottomWidth: 2, marginLeft: 40, marginRight: 40, borderColor: '#999999' },
  bgCamera: {
    width: 40,
    height: 40,
    backgroundColor: '#F85F6A',
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 100,
    marginTop: 100
  },
  viewImgbg: { width: window.width, height: 140, borderRadius: 70, alignItems: 'center' },
  accountIcon: { fontSize: 25, color: '#000', marginLeft: 10, marginRight: 10 },
  Button: { backgroundColor: '#F85F6A', width: '50%' },
  editText: { fontSize: 20, textAlign: 'center', alignSelf: 'center', marginLeft: 70 },
});
export default EditProfile;