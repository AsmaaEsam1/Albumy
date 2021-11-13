import React, { useEffect, useState } from 'react';
import { View, ImageBackground, PermissionsAndroid, Platform, Image, FlatList, StyleSheet } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, Button, Appbar, Dialog } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather';
import Menu from '../components/Menu'
import { useTheme } from '@react-navigation/native'
import { strings } from '../languages/Localization';
import { SafeAreaView, Dimensions } from 'react-native';
import { Drawer } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


const window = Dimensions.get('window')
const Albums = ({ navigation }) => {
  const { colors } = useTheme()
  const [language, setLanguage] = useState('')
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEamil] = useState('')
  const [data, setData] = useState([])
  const [visibleDialog, setVisibleDialog] = useState(false);
  const STORAGE_LANGUAGE_KEY = '@save_language'
  const STORAGE_USEREMAIL_KEY = '@save_useremail'
  const islogged = 'false'

  const Logout = () => {

    navigation.navigate('SignIn')
    setVisible(false)
    setVisibleDialog(false)
  }
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  const [total, setTotal] = useState({ total: 0, next: true, after: '' });

  const getTotal = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: 100,
      after: total.after,
      assetType: 'Photos',
    })
      .then(({ edges, page_info }) => {
        const newCount = edges.length;
        const nextPage = page_info.has_next_page;
        const after = page_info.end_cursor;
        setTotal({ total: total.total + newCount, next: nextPage, after: after })
      })
      .catch((err) => {
        console.log(err)
      });
  }
  const getAllPhotos = async (numPhotos) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: numPhotos,
      assetType: 'Photos',
    })
      .then(r => {
        setData(r.edges)
      }).catch((err) => {
        console.log(err)
      })
  }
  const getcurrentUser = async () => {
    try {
      const useremail = await AsyncStorage.getItem(STORAGE_USEREMAIL_KEY);
      if (useremail !== null) {
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM table_user where user_email = ?', [useremail],
            (tx, results) => {
              var len = results.rows.length;
              if (len > 0) {
                setUsername(results.rows.item(0).user_name)
                setEamil(results.rows.item(0).user_email)
              }
            }
          )
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    selectLanguage();
    setVisible(false)
    // getcurrentUser()
    if (total.next) {
      getTotal().then(() => {
        console.log(total.total)

      })
    } else {
      console.log('total : ', total.total)
      getAllPhotos(total.total)
    }
  }, [total, navigation])

  const updateMenuState = (isOpen) => {
    setVisible(false)
  }
  const openProfile = () => {
    setVisible(!visible)
    navigation.replace('MyProfile')
  }
  const openAlbum = () => {
    setVisible(!visible)
    navigation.navigate('MyAlbum')
  }
  const openSettings = () => {
    setVisible(!visible)
    navigation.navigate('Settings')
  }
  const openDialogLogout = () => {
    setVisible(!visible)
    setVisibleDialog(true)
  }
  const showingMenu = () => {
    setVisible(!visible)
  }
  const selectLanguage = async () => {
    try {
      const languageApp = await AsyncStorage.getItem(STORAGE_LANGUAGE_KEY);
      setLanguage(languageApp)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={{ flex: 1 }} >
      <Appbar.Header style={{ backgroundColor: colors.card }}>
        <Appbar.Action color='#F85F6A' size={30} icon="menu" onPress={() => showingMenu()} />
        <Text style={{ color: colors.text, fontSize: 20 }}> {strings.Albums} </Text>
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>

        <Drawer
          type='displace'
          content={
            <Menu
              username={username}
              email={email}
              profile={() => openProfile()}
              Settings={() => openSettings()}
              exit={() => updateMenuState()}
              home={() => navigation.replace('Albums')}
              MyAlbum={() => openAlbum()}
              Logout={() => openDialogLogout()} />}
          open={visible}       >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <FlatList
              data={data}
              numColumns={3}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => {
                {

                  return (
                    <TouchableOpacity style={{ flex: 1, margin: 6 }} onPress={() =>
                      navigation.navigate('openAlbum', { sourceImage: item.node.image.uri })}>
                      <ImageBackground imageStyle={styles.image} style={styles.image} source={{ uri: item.node.image.uri }} />
                    </TouchableOpacity>
                  )

                }
              }
              }


            />


            {/* <View style={{ flexDirection: 'row' }}>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('openAlbum')}>
                  <ImageBackground style={styles.imagetwo} imageStyle={{ borderRadius: 20 }} source={require('../images/faceTwo.jpg')}>
                    <View style={{ flexDirection: 'row', borderBottomStartRadius: 20, borderBottomEndRadius: 20, justifyContent: 'space-between', backgroundColor: '#000000a0', marginTop: 78 }}>
                      <Text style={{ color: '#fff', marginLeft: 10 }}>200</Text>
                      <Feather style={{ marginRight: 10 }} color="#fff" size={20} name="lock" />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('openAlbum')}>
                  <ImageBackground style={styles.imageone} imageStyle={{ borderRadius: 20 }} source={require('../images/faceOne.jpg')}>
                    <View style={{ flexDirection: 'row', borderBottomStartRadius: 20, borderBottomEndRadius: 20, justifyContent: 'space-between', backgroundColor: '#000000a0', marginTop: 78 }}>
                      <Text style={{ color: '#fff', marginLeft: 10 }}>200</Text>
                      <Feather style={{ marginRight: 10 }} color="#fff" size={20} name="lock" />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('openAlbum')}>
                <ImageBackground style={styles.imagethree} imageStyle={{ borderRadius: 20 }}
                  source={require('../images/faceThree.jpg')}>
                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', borderBottomStartRadius: 20, borderBottomEndRadius: 20
                    , backgroundColor: '#000000a0', marginTop: 188
                  }}>
                    <Text style={{ color: '#fff', marginLeft: 10 }}>200</Text>
                    <Feather style={{ marginRight: 10 }} color="#fff" size={20} name="lock" />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View> */}

          </View>

        </Drawer>

      </SafeAreaView>

      <Dialog style={{ backgroundColor: colors.border }} visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
        <Dialog.Title style={{ color: colors.text }}>{strings.Sure}</Dialog.Title>
        <Dialog.Actions style={{ justifyContent: 'space-around' }}>
          <Button color='#FF4500' onPress={() => Logout()}>{strings.Logout}</Button>
          <Button color='#1E90FF' onPress={() => setVisibleDialog(false)}>{strings.Cancel}</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

  },
  imageone: {
    marginTop: 10,
    marginRight: 20,
    width: 180,
    height: 100,
    borderRadius: 20
  },
  imagetwo: {
    marginTop: 50,
    marginRight: 20,
    width: 180,
    height: 100,
    borderRadius: 20
  },
  imagethree: {
    marginTop: 50,
    width: 120,
    height: 210,
    borderRadius: 20
  },
  imagefour: {
    marginTop: 120,
    width: '90%',
    height: 210,
    borderRadius: 20
  }
});

export default Albums;