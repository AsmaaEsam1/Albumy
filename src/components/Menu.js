import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import{Text} from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import {strings} from '../languages/Localization'
import { I18nManager } from 'react-native';
const window = Dimensions.get('window')
export default function Menu  ({username,email,profile, Settings,exit,home,Logout,MyAlbum})  {
    const {colors} = useTheme()
useEffect(()=>{
  
},[])
    return(
    <SafeAreaView style={[styles.menu,{backgroundColor:colors.card}]}>
    
    <View style={{backgroundColor:'#EA727B',borderBottomLeftRadius:80,borderBottomRightRadius:80}}>

      <TouchableOpacity onPress={()=> exit()}>
      <Icon style={{marginLeft:200, color:colors.text}} name="close"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> profile()}>
      <View style={{alignItems:'center'}}>
        <Image style={styles.image} source={require('../images/girl_wide_brim_hat.png')}/>
        <Text style={[styles.name,{color:colors.text}]}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      </TouchableOpacity>
            </View>
      <View style={{flex:1, alignItems:'center'}}>
        
      <View style={{flex:1,alignItems:'flex-start', justifyContent:'space-around',marginBottom:50}}>

      <TouchableOpacity onPress={()=>home()}>
        <View style={{flexDirection:'row'}}>
          <Feather style={{fontSize:25,marginRight:30,color:colors.text}} name="home"/>
          <Text style={{fontSize:18,color:colors.text}}>{strings.Home}</Text>
        </View> 
      </TouchableOpacity>

        <TouchableOpacity onPress={()=>profile()}>
         <View style={{flexDirection:'row'}}>
          <Feather style={{fontSize:25,marginRight:30,color:colors.text}} name="user"/>
          <Text style={{fontSize:18,color:colors.text}} >{strings.Profile}</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>MyAlbum()}>
        <View style={{flexDirection:'row'}}>
          <AntDesign style={{fontSize:25,marginRight:30,color:colors.text}} name="picture"/>
          <Text style={{fontSize:18,color:colors.text}}>{strings.Album}</Text>
        </View> 
       </TouchableOpacity>

        <TouchableOpacity onPress={()=>Settings()}>
        <View style={{flexDirection:'row'}}>
          <Feather style={{fontSize:25,marginRight:30,color:colors.text}} name="settings"/>
          <Text style={{fontSize:18,color:colors.text}}>{strings.Setting}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Logout()}>
         <View style={{flexDirection:'row'}}>
          <Feather style={{fontSize:25,marginRight:30,color:colors.text}} name="log-out"/>
          <Text style={{fontSize:18,color:colors.text}}>{strings.Logout}</Text>
          </View>
       </TouchableOpacity>
          </View>
           </View>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
menu:{
  width:'100%',
  height:window.height,
  backgroundColor:'white',
},
image:{
width:80,
height:80,
borderRadius:40,
},
name:{
    fontSize:14,
    color:'#000',
},
email:{
    fontSize:12,
    color:'#A9A9A9',
    marginBottom:20
}
});

