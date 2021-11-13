import React,{useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Picker} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import{Divider, Provider, Menu, Appbar} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native'
import { strings } from '../languages/Localization';
import AsyncStorage from '@react-native-community/async-storage';

const window = Dimensions.get('window')

const openAlbum = ({navigation}) =>{
    const {colors} = useTheme()
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [language, setLanguage] = useState('')
        const STORAGE_LANGUAGE_KEY = '@save_language'

    const x = 20;
    useEffect(()=>{
      selectLanguage();
    },[])
    const openMenu = () => setVisibleMenu(!visibleMenu);
    const closeMenu = () => setVisibleMenu(false);
     const selectLanguage = async() =>{
  try{
        const languageApp = await AsyncStorage.getItem(STORAGE_LANGUAGE_KEY);
        setLanguage(languageApp)
      }catch(err){
        console.log(err)
      }
  }
    return(
        <View style={{flex:1}}>
       <Appbar.Header style={{backgroundColor:colors.card, justifyContent:'space-between'}}>
    <Appbar.BackAction onPress={()=>navigation.navigate('Albums')} />
    <Appbar.Action icon="dots-vertical" onPress={openMenu} />
  </Appbar.Header>
  <Provider >
    <View>
      <Menu
        visible={visibleMenu}
        onDismiss={closeMenu}
        contentStyle={{backgroundColor:colors.card}}
        style={{}}
        anchor={{x:(strings.getLanguage()== 'ar'?  x: window.width-20), y: 50}}>
        <Menu.Item  onPress={() =>{setVisibleMenu(false)}} title={<Text style={{color:colors.text}}>{strings.ByDate}</Text>}  />
        <Divider style={{backgroundColor:colors.text}}/>
        <Menu.Item onPress={()=>{setVisibleMenu(false)}} title={<Text style={{color:colors.text}}>{strings.ByPlace}</Text>}  />
      </Menu>
    </View>
  </Provider>
  <View style={{flex:1, alignItems:'center'}}>
    <Text style={{alignSelf:'center', color:colors.text}}>{strings.AlbumPhotos}</Text>

  </View>
      <Feather style={{alignSelf:'flex-end', alignContent:'flex-end',
       marginBottom:10, marginRight:20}} color={colors.text} size={20} name="lock"/>

    </View>
    )
}

const styles = StyleSheet.create({

});

export default openAlbum;