import React, { useLayoutEffect, useState, useRef } from 'react';
import { View, Image, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import { strings } from '../languages/Localization';
import { colors, Input } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import PhoneInput from 'react-native-phone-number-input';
import { KeyboardAvoidingView } from 'react-native';
const SignIn = ({ navigation }) => {
    const STORAGE_USEREMAIL_KEY = '@save_useremail'
    const { colors } = useTheme()
    const [enableShift, setEnableShift] = useState(false);
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [passError, setPassError] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const phoneInput = useRef('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: strings.signIn
        })
    })
    const openAlbum = async () => {
        navigation.replace('Albums')
        try {
            await AsyncStorage.setItem(STORAGE_USEREMAIL_KEY, email)

        } catch (error) {
            console.log(error)
        }
    }
    const validatePhoneNumber = (phonenumber) => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(phonenumber)
    }
    const SignIn = (phoneNumber) => {
        navigation.navigate('Albums')
        // if (password == '') {
        //     setPassError('The Password is required !')
        // }

        // Request to send OTP
        // if (validatePhoneNumber(phoneNumber)) {
        //     firebase.auth().signInWithPhoneNumber(phoneNumber).then(confirmResult => {
        //         setCode(confirmResult)
        //     }).catch(error => {
        //         console.log(error)
        //     }).then(() => {
        //         navigation.navigate('Albums')
        //     })
        // }
        // else {
        //     alert('Invalid Phone Number')
        // }
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{ flex: 1 }} enabled={enableShift}>
                <View style={{ flex: 1 }}>
                    <ScrollView>

                        <View style={styles.viewcenter}>

                            <Image style={styles.image} source={require('../images/girl_wide_brim_hat.png')}></Image>

                            <View style={[styles.viewInput, { backgroundColor: colors.card }]}>

                                <TextInput style={{ color: colors.text, marginLeft: 20 }}
                                    placeholder={strings.YourEmail}
                                    errorMessage={emailError}
                                    placeholderTextColor='#A5A3A2'
                                    onChangeText={(text) => setEmail(text.trim())} />
                                { /*<PhoneInput
                                    containerStyle={{ width: '100%', height: 50 }}
                                    textInputStyle={{ height: 50 }}
                                    defaultValue={phonenumber}
                                    placeholder={strings.PhoneNumber}
                                    ref={phoneInput}
                                    // onChangeText={(text) => setPhonenumber(text)}
                                    onChangeFormattedText={(text) => setPhonenumber(text)}
                                    defaultCode='EG'
                               />*/}
                            </View>

                            <View style={[styles.viewInput, { backgroundColor: colors.card }]}>

                                <TextInput style={{ color: colors.text, marginLeft: 20 }}
                                    placeholder={strings.Password}
                                    errorMessage={passError}
                                    onChangeText={(text) => setPassword(text)}
                                    placeholderTextColor='#A5A3A2'

                                //secureTextEntry={true} 
                                />

                            </View>

                            <View style={styles.viewcreate}>

                                <Text style={{ marginRight: 5, color: colors.text }}>
                                    {strings.createAccount}
                                </Text>

                                <Text style={{ color: '#F85F6A' }}
                                    onPress={() => { navigation.navigate('SignUp') }}>
                                    {strings.signUp}
                                </Text>

                            </View>

                            <Button style={styles.button}
                                uppercase={false} mode='contained'
                                color='#111'
                                onPress={() => SignIn(phonenumber)}>
                                {strings.signIn}
                            </Button>

                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    viewcenter: {
        alignContent: 'center',
        alignItems: 'center'
    },
    viewcreate: {
        marginTop: 30,
        flexDirection: 'row'
    },
    image: {
        marginTop: 50,
        width: 250,
        height: 300,
        borderRadius: 20
    },
    viewInput: {
        marginTop: 35,
        width: '85%',
        height: 45,
        borderRadius: 20,
    },
    input: {
        color: colors.text
    },
    button: {
        backgroundColor: '#F85F6A',
        marginTop: 30
    }
});

export default SignIn;