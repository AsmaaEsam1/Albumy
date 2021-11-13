import React, { useEffect, useReducer, useState } from 'react'
import { ImageBackground, View, I18nManager } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { strings } from '../languages/Localization'

const Splash = ({ navigation }) => {
  const STORAGE_USEREMAIL_KEY = '@save_useremail'
  const STORAGE_LANGUAGE_KEY = '@save_language'

  const [islogged, setIslogged] = useState('');
  // const [username,setUsername] = useState('')
  const getUsername = async () => {
    try {
      const useremail = await AsyncStorage.getItem(STORAGE_USEREMAIL_KEY);
      console.log(useremail)
      if (useremail != null) {
        db.transaction(function (tx) {
          tx.executeSql('SELECT islogged FROM table_user where user_email = ?',
            [useremail],
            (tx, results) => {
              var len = results.rows.length;
              if (len > 0) {
                setIslogged(results.rows.item(0).islogged)
              } else {
                setIslogged('false')
              }
            })
        })
      }
      else {
        navigation.navigate('SignIn')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setTimeout(function () {

      getUsername().then(() => {
        if (islogged == 'true') {
          navigation.navigate('Albums')
        }
        else if (islogged == 'false') {
          navigation.navigate('SignIn')
        }

      })
    }, 3000)
  }, [islogged])




  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={require('../images/album.jpg')} >
      </ImageBackground>
    </View>
  )
}
export default Splash;