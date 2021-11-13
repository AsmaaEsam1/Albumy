import { CheckBox } from 'native-base';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native'
import { Button, Text, } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { strings } from '../languages/Localization'
import { Input } from 'react-native-elements'
import PhoneInput from 'react-native-phone-number-input'
import AsyncStorage from '@react-native-community/async-storage'

const ContainSignUp = ({ navigation }) => {
  const STORAGE_USEREMAIL_KEY = '@save_useremail'
  const { colors } = useTheme()
  const [check, setCheck] = useState(true)
  const [username, setUsername] = useState('')
  const [errorName, setErrorName] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPass, setErrorPass] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [enableShift, setEnableShift] = useState(false)
  const islogged = 'true'
  const phoneInput = useRef(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: strings.signUp
    })
  })
  useEffect(() => {

    const openAlbums = async () => {
      navigation.replace('Albums')
      try {
        await AsyncStorage.setItem(STORAGE_USEREMAIL_KEY, email)
      } catch (err) {
        console.log(err)
      }
    }
    const SignUp = async () => {
      if (username == '') {
        setErrorName('UserName is required !')
      }
      if (password == '') {
        setErrorPass('Password is required !')
      }
      if (email == '') {
        setErrorEmail('Email is required !')
      }
      else if (!email.includes('@')) {
        setErrorEmail('The Email address is badly formatted')
      }
      else if (!email.includes('com')) {
        setErrorEmail('The email is invalid')
      }
      else {

      }

    }
  })
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={enableShift}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ margin: 20 }}>
              <Text style={styles.Textone}>
                {strings.Name}
              </Text>

              <Input style={[styles.TextInputs, { color: colors.text }]}
                selectionColor={colors.text}
                placeholderTextColor='#A5A3A2'
                placeholder={strings.YourName}
                onChangeText={text => setUsername(text)}
                errorMessage={errorName} />

              <Text style={styles.Texts}>
                {strings.Email}
              </Text>

              <Input style={[styles.TextInputs, { color: colors.text }]}
                selectionColor={colors.text}
                placeholderTextColor='#A5A3A2'
                placeholder={strings.YourEmail}
                onChangeText={text => setEmail(text)}
                errorMessage={errorEmail} />

              {/*  <Text style={styles.Texts}>
                {strings.PhoneNumber}
              </Text>

              <PhoneInput
                containerStyle={{ width: '100%', height: 50 }}
                textInputStyle={{ height: 50 }}
                defaultValue={phonenumber}
                placeholder={strings.PhoneNumber}
                ref={phoneInput}
                onChangeText={(text) => setPhonenumber(text)}
                defaultCode='EG'
              />*/}

              <Text style={styles.Texts}>
                {strings.Password}
              </Text>
              <View style={{ width: '100%' }}>
                <Input style={[styles.TextInputs, { color: colors.text }]}
                  selectionColor={colors.text}
                  placeholderTextColor='#A5A3A2'
                  placeholder={strings.Password}
                  //secureTextEntry={true}
                  onChangeText={(text => setPassword(text))}
                  errorMessage={errorPass}
                />
              </View>
              <View style={styles.viewServices}>

                <CheckBox style={styles.CheckBox}
                  checked={check}
                  onPress={() => setCheck(!check)}
                  color='#F85F6A'
                />

                <Text style={{ color: colors.text }}>
                  {strings.agree}
                  <Text style={{ color: '#F85F6A' }}>
                    {' ' + strings.TermsofServices + ' '}
                  </Text>
                  {strings.And}
                </Text>

              </View>
              <Text style={styles.textServices}>
                {strings.PrivacyPolicy}
              </Text>

              <TouchableOpacity onPress={() => SignUp()}>
                <Button style={styles.Button}
                  uppercase={false}
                  mode='contained'
                  color='#111'>
                  {strings.signUp}
                </Button>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  Textone: {
    color: '#F85F6A',
    fontSize: 20,
    marginBottom: 20
  },
  Texts: {
    color: '#F85F6A',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10
  },
  TextInputs: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#666666'
  },
  CheckBox: {
    width: 20,
    height: 20,
    marginRight: 20
  },
  Button: {
    backgroundColor: '#F85F6A',
    marginTop: 50
  },
  image: {
    marginTop: 50,
    width: 300,
    height: 400,
    borderRadius: 20
  },
  viewServices: {
    flexDirection: 'row',
    marginTop: 50
  },
  textServices: {
    color: '#F85F6A',
    marginTop: 10,
    marginLeft: 30
  }
});

export default ContainSignUp;