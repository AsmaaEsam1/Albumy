import React,{useState, useLayoutEffect} from 'react'
import {View, Text, StyleSheet, SafeAreaView,
    KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import {Button} from 'react-native-paper'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native'
import { strings } from '../languages/Localization';

const AddAccounts= ({navigation}) =>{
    const [enableShift, setEnableShift] = useState(false) 
    const {colors} = useTheme();
    
// header Title
 useLayoutEffect(()=>{
            navigation.setOptions({
                headerTitle:strings.Accounts
            })
        })

return(
<KeyboardAvoidingView style={{flex:1}} enabled={enableShift}>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<SafeAreaView style={{flex:1}}>
<ScrollView>

 <View style={styles.Container}>

    <View style={styles.Views}>
        <Feather style={styles.Icons} name="facebook"/>
        <Text style={styles.Texts}>{strings.Facebook}</Text>
    </View>

    <TextInput style={styles.TextInput} 
     selectionColor={colors.text} 
     placeholderTextColor={colors.editText} 
     placeholder={strings.Accountaddress} 
    />

    <View style={styles.Views}>
        <FontAwesome style={styles.Icons} name="whatsapp"/>
        <Text style={styles.Texts}>{strings.WhatsApp}</Text>
    </View>

    <TextInput style={styles.TextInput} 
     selectionColor={colors.text}
     placeholderTextColor={colors.editText} 
     placeholder={strings.Accountaddress}
     />

     <View style={styles.Views}>
        <Feather style={styles.Icons} name="twitter"/>
        <Text style={styles.Texts}>{strings.Twitter}</Text>
    </View>

    <TextInput style={styles.TextInput} 
     onFocus={()=>setEnableShift(true)} 
     selectionColor={colors.text} 
     placeholderTextColor={colors.editText} 
     placeholder={strings.Accountaddress}  />

    <View style={styles.Views}>
        <Feather style={styles.Icons} name="instagram"/>
        <Text style={styles.Texts}>{strings.Instagram}</Text>
    </View>

    <TextInput style={styles.TextInput}
     selectionColor={colors.text} 
     placeholderTextColor={colors.editText}  
     placeholder={strings.Accountaddress}  />

    <Button style={styles.Button} uppercase={false} 
     mode='contained' color='#111'
     onPress={()=>navigation.navigate('MyProfile')}>
         {strings.AddAccount}
    </Button> 

</View>
</ScrollView>
</SafeAreaView>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
Container:{
    margin:20,flex:1,justifyContent:'center'
},
Views:{
    flexDirection:'row',marginTop:30
},
TextInput:{
    borderBottomWidth:2,
    borderBottomColor:'#999999',
    marginLeft:20,
    marginRight:20,
    color:'#000'
},
Icons:{
    fontSize:25, 
    color:'#F85F6A' ,
    marginLeft:10,
    marginRight:10
},
Texts:{
    fontSize:20, color:'#F85F6A'
},
Button:{
    backgroundColor:'#F85F6A', marginTop:60
}
});
export default AddAccounts;