import React, { useLayoutEffect, useState,useEffect } from 'react'
import {View, Text, Image,StyleSheet, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import{Divider, Provider, Menu, Appbar} from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native'
import { ImageBackground } from 'react-native';
import { strings } from '../languages/Localization';
import AsyncStorage from '@react-native-community/async-storage';

const window = Dimensions.get('window')
const MyAlbum =({navigation}) =>{
    const {colors} = useTheme()
    const [visibleMenu, setVisibleMenu] = useState(false);
    const STORAGE_LANGUAGE_KEY = '@save_language'
    const [language, setLanguage] = useState('')
    const openMenu = () => setVisibleMenu(!visibleMenu);
    const closeMenu = () => setVisibleMenu(false);
    const x = 20;
     useEffect(()=>{
      getLanguage();
      console.log(strings.getLanguage())
    })
    const getLanguage = async () =>{
       try{
        const languageApp = await AsyncStorage.getItem(STORAGE_LANGUAGE_KEY);
        setLanguage(languageApp)
      }catch(err){
        console.log(err)
      }
    }
    return(
        <View style={{flex:1}}>
        <View style={{width:window.width, height:'20%',backgroundColor:'#EA727B'}}>
            <View style={{flexDirection:'row',width:window.width, justifyContent:'space-between'}}>
          { strings.getLanguage() == 'ar' ?
             (<TouchableOpacity onPress={()=>navigation.navigate('Albums')}>
             <Feather style={{fontSize:25, marginLeft:20,marginTop:20}} 
             color='#fff' name="arrow-right" />
             </TouchableOpacity>):(
               <TouchableOpacity onPress={()=>navigation.navigate('Albums')}>
             <Feather style={{fontSize:25 , marginLeft:20,marginTop:20}} 
             color='#fff' name="arrow-left" />
             </TouchableOpacity>
             )
           }
                <Feather style={{fontSize:25, marginRight:10,marginTop:20}} color='#fff' name="more-vertical" onPress={openMenu}/>  
              </View>
               <ImageBackground style={styles.Image} imageStyle={styles.Image} source={require('../images/girl_wide_brim_hat.png')}> 
               </ImageBackground>
              <Provider >
                 <View>
                    <Menu
                      visible={visibleMenu}
                      onDismiss={closeMenu}
                      contentStyle={{backgroundColor:colors.card}}
                     anchor={{ x:(strings.getLanguage()==='ar' ?  x: window.width-20), y:40}}>

                    <Menu.Item  onPress={() => {setVisibleMenu(false) }} title={<Text style={{color:colors.text}}>{strings.ByDate}</Text>}/>
                     <Divider style={{backgroundColor:colors.text}}/>
                    <Menu.Item onPress={() => {setVisibleMenu(false) }} title={<Text style={{color:colors.text}}>{strings.ByPlace}</Text>} />
                 </Menu>
              </View>
             </Provider>
                         
           
            <Text style={{justifyContent:'center',alignSelf:'center',marginTop:'50%', color:colors.text}}>{strings.PhotosAlone}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
Image:{
    width:130,
    height:130,
    borderRadius:65,
    marginTop:20,
    justifyContent:'center',
    alignSelf:'center'
},
});

export default MyAlbum;