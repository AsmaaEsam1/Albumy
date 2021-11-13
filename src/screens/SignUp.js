import React,{useLayoutEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native'
import {Button, Text} from 'react-native-paper'
import {useTheme} from '@react-navigation/native'
import {strings} from '../languages/Localization'
const SignUp = ({navigation}) =>{
    const {colors} = useTheme()
     useLayoutEffect(()=>{
            navigation.setOptions({
                headerTitle:strings.signUp
            })
        })
    return(
        <View style={styles.container}>
          <Image style={styles.image} source={require('../images/girl_wide_brim_hat.png')}></Image>

           <View style={styles.viewnew}>

            <Text style={{marginRight:5,color:colors.text}}>
                {strings.haveAccount}
            </Text>
            <Text style={{color:'#F85F6A'}} onPress={()=>navigation.navigate('SignIn')}>
                {strings.signIn}
            </Text>
            </View>

          <Button style={styles.button} uppercase ={false} 
            mode='contained' color='#111' 
            onPress={()=>navigation.navigate('ContainSignUp')}>
                {strings.contain}
          </Button>

        </View>
    )
}

const styles = StyleSheet.create({
container:{
    alignContent:'center', 
    alignItems:'center'
},
image:{
    marginTop:50,
    width:300,
    height:400,
    borderRadius:20
},
viewnew:{
    marginTop:30,
    flexDirection:'row'
},
button:{
    backgroundColor:'#F85F6A', 
    marginTop:30
}
});

export default SignUp;