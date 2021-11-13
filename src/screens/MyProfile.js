import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useTheme } from '@react-navigation/native'
import { strings } from '../languages/Localization';
import AsyncStorage from '@react-native-community/async-storage';
const window = Dimensions.get('window');

const MyProfile = ({ navigation }) => {
  const { colors } = useTheme()
  const STORAGE_LANGUAGE_KEY = '@save_language'
  const STORAGE_USEREMAIL_KEY = '@save_useremail'
  const [language, setLanguage] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.header,
      headerTitle:
        <View style={{ width: '100%', height: '100%', alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 20, marginBottom: 10, marginLeft: 30 }}>{strings.Profile}</Text>
          <Image style={styles.Image} source={require('../images/girl_wide_brim_hat.png')} />
          <Text style={{ color: '#fff', marginTop: 10, marginLeft: 30 }}>Asmaa</Text>
        </View>,
      headerLeft: () => (
        <View>
          {strings.getLanguage() === 'ar' ?
            (<TouchableOpacity onPress={() => navigation.replace('Albums')}>
              <Feather style={{ fontSize: 30, marginLeft: 20, marginBottom: 170 }}
                color='#fff' name="arrow-right" />
            </TouchableOpacity>) : (
              <TouchableOpacity onPress={() => navigation.replace('Albums')}>
                <Feather style={{ fontSize: 30, marginLeft: 20, marginBottom: 170 }}
                  color='#fff' name="arrow-left" />
              </TouchableOpacity>
            )
          }
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => editProfile()}>
          <Feather style={{ fontSize: 30, marginRight: 20, marginBottom: 170 }} color='#fff' name="edit" />
        </TouchableOpacity>
      )
    });
  });
  useEffect(() => {
    getLanguage();
    getcurrentUser();
  })
  const getLanguage = async () => {
    try {
      const languageApp = await AsyncStorage.getItem(STORAGE_LANGUAGE_KEY);
      setLanguage(languageApp)
      console.log(language)
    } catch (err) {
      console.log(err)
    }
  }
  const getcurrentUser = async () => {
    try {
      const useremail = await AsyncStorage.getItem(STORAGE_USEREMAIL_KEY)
      if (useremail !== null) {
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM table_user where user_email = ?', [useremail],
            (tx, results) => {
              var len = results.rows.length
              if (len > 0) {
                setUsername(results.rows.item(0).user_name)
                setEmail(results.rows.item(0).user_email)
              }
            })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const editProfile = () => {
    navigation.navigate('EditProfile', {
      usernames: username,
      email: email
    })
  }
  return (
    <View>
      <View style={styles.view}>
        <Feather style={styles.icons} name="user" />
        <Text style={{ color: colors.card }}>Asmaa</Text>
      </View>
      <View style={styles.view}>
        <FontAwesome style={styles.icons} name="envelope-o" />
        <Text style={{ color: colors.card }}>Asmaa123@gmail.com</Text>
      </View>
      <View style={styles.view}>
        <Feather style={styles.icons} name="phone" />
        <Text style={{ color: colors.card }}>+20 0109999655</Text>
      </View>
      <View style={styles.view}>
        <SimpleLineIcons style={styles.icons} name="location-pin" />
        <Text style={{ color: colors.card }}>El Sharqia, Egypt</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'space-around' }}>
        <Feather style={{ fontSize: 25, color: colors.text }} name="facebook" />
        <Text style={{ color: colors.text }}>{strings.Accountaddress}</Text>
        <Feather style={{ fontSize: 25, color: colors.text }} name="instagram" />
        <Text style={{ color: colors.text }}>{strings.Accountaddress}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    marginTop: 10,
  },
  icons: {
    fontSize: 25,
    marginRight: 30,
    marginLeft: 20,
    color: '#F85F6A'
  },
  header: {
    height: 250,
    backgroundColor: '#EA727B',
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100

  },
  Image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginLeft: 30
  },
});
export default MyProfile;