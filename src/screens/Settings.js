import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, I18nManager } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider, Dialog, Switch, RadioButton, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { EventRegister } from 'react-native-event-listeners'
import { strings } from '../languages/Localization'
const window = Dimensions.get('window')
import RNRestart from 'react-native-restart';
import { useTheme } from '@react-navigation/native'

const Settings = ({ navigation }) => {
  const STORAGE_THEME_KEY = '@save_theme'
  const STORAGE_LANGUAGE_KEY = '@save_language'
  const { colors } = useTheme()
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [visibleTheme, setVisibleTheme] = useState(false);
  const [checkedTheme, setCheckedTheme] = useState('');
  const [theme, setTheme] = useState('')
  const [visibleLanguage, setVisibleLanguage] = useState(false);
  const [checkedLanguage, setCheckedLanguage] = useState('');
  const [language, setLanguage] = useState('')
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: strings.Setting
    })
  })
  useEffect(() => {
    readTheme()
    readLanguage()

  }, [])
  const changeTheme = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_THEME_KEY, checkedTheme)

      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }
  const changeLanguages = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_LANGUAGE_KEY, checkedLanguage)

    } catch (e) {
      console.log(e)
    }

  }
  const readTheme = async () => {
    try {
      const getTheme = await AsyncStorage.getItem(STORAGE_THEME_KEY)
      if (getTheme == null) {
        setTheme(strings.Systemdefault)
        setCheckedTheme('Systemdefault')
      }
      else if (getTheme !== null) {
        if (getTheme == 'Systemdefault') {
          setTheme(strings.Systemdefault)
          setCheckedTheme('Systemdefault')
        }
        else if (getTheme == 'Dark') {
          setTheme(strings.Dark)
          setCheckedTheme('Dark')
        }
        else if (getTheme == 'Light') {
          setTheme(strings.Light)
          setCheckedTheme('Light')
        }
        EventRegister.emit('changeThemeApp', getTheme)

      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
    setVisibleTheme(false)

  }
  const readLanguage = async () => {

    try {
      const getLanguage = await AsyncStorage.getItem(STORAGE_LANGUAGE_KEY)
      if (getLanguage == null) {
        if (strings.getLanguage() == 'en') {
          setLanguage('English')
          setCheckedLanguage('English')
        }
        else if (strings.getLanguage() == 'ar') {
          setLanguage('Arabic العربيه')
          setCheckedLanguage('Arabic العربيه')
        }
        else if (strings.getLanguage() == 'fr') {
          setLanguage('French')
          setCheckedLanguage('French')
        }
      }
      else if (getLanguage !== null) {
        setLanguage(getLanguage)
        setCheckedLanguage(getLanguage)
      }
    } catch (error) {
      alert('Failed to fetch the data from storage')
    }
    setVisibleLanguage(false)

  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>

        <TouchableOpacity onPress={() => setVisibleTheme(true)}>
          <View style={styles.viewchange}>

            <MaterialIcons style={styles.icon} name="brightness-medium" />
            <View>
              <Text style={styles.textchanges}>
                {strings.Theme}
              </Text>

              <Text style={styles.texts}>
                {theme}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setVisibleLanguage(true)}>
          <View style={styles.viewchange}>

            <FontAwesome style={styles.icon} name="bars" />
            <View>
              <Text style={styles.textchanges}>
                {strings.Language}
              </Text>

              <Text style={styles.texts}>
                {language}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.viewcontainershare} />
        <View style={styles.viewshare}>

          <View>
            <Text style={styles.textshare}>
              {strings.Share}
            </Text>

            <Text style={{ color: '#999999' }}>
              {strings.Allow}
            </Text>
          </View>

          <Switch color='#F85F6A'
            value={isSwitchOn}
            onValueChange={() => setIsSwitchOn(!isSwitchOn)} />

        </View>
      </View>

      <Dialog style={{ backgroundColor: colors.card }} visible={visibleTheme} onDismiss={() => setVisibleTheme(false)}>
        <Dialog.Title style={{ color: colors.text }}>{strings.ChooseTheme}</Dialog.Title>
        <Dialog.Content>
          <TouchableOpacity onPress={() => changeTheme()}>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton value={strings.Systemdefault}
                status={checkedTheme === 'Systemdefault' ? 'checked' : 'unchecked'}
                onPress={() => { setCheckedTheme('Systemdefault') }}
                color='#F85F6A'
              />
              <Text style={{ marginTop: 5, color: colors.text }}>
                {strings.Systemdefault}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changeTheme()}>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton value={strings.Dark}
                status={checkedTheme === 'Dark' ? 'checked' : 'unchecked'}
                onPress={() => { setCheckedTheme('Dark') }}
                color='#F85F6A' />
              <Text style={{ marginTop: 5, color: colors.text }}>
                {strings.Dark}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changeTheme()}>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton value={strings.Light}
                status={checkedTheme === 'Light' ? 'checked' : 'unchecked'}
                onPress={() => { setCheckedTheme('Light') }}
                color='#F85F6A' />
              <Text style={{ marginTop: 5, color: colors.text }}>
                {strings.Light}
              </Text>
            </View>
          </TouchableOpacity>

        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'space-around' }}>
          <Button color={colors.text} onPress={() => setVisibleTheme(false)}>{strings.Cancel}</Button>
          <Button color={colors.text} onPress={() => readTheme()}>{strings.Ok}</Button>
        </Dialog.Actions>
      </Dialog>


      <Dialog style={{ backgroundColor: colors.card }} visible={visibleLanguage} onDismiss={() => setVisibleLanguage(false)}>
        <Dialog.Title style={{ color: colors.text }}>{strings.Chooselanguage}</Dialog.Title>
        <Dialog.Content>

          <TouchableOpacity onPress={() => changeLanguages()}>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton value="English"
                status={checkedLanguage === 'English' ? 'checked' : 'unchecked'}
                onPress={() => setCheckedLanguage('English')}
                color='#F85F6A'
              />
              <Text style={{ marginTop: 5, color: colors.text }}>
                English
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changeLanguages()}>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton value="Arabic العربيه"
                status={checkedLanguage === 'Arabic العربيه' ? 'checked' : 'unchecked'}
                onPress={() => setCheckedLanguage('Arabic العربيه')}
                color='#F85F6A'
              />
              <Text style={{ marginTop: 5, color: colors.text }}>
                Arabic العربيه
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changeLanguages()}>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton value="French"
                status={checkedLanguage === 'French' ? 'checked' : 'unchecked'}
                onPress={() => setCheckedLanguage('French')}
                color='#F85F6A'
              />
              <Text style={{ marginTop: 5, color: colors.text }}>
                French
              </Text>
            </View>
          </TouchableOpacity>

        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'space-around' }}>
          <Button color={colors.text} onPress={() => setVisibleLanguage(false)}>{strings.Cancel}</Button>
          <Button color={colors.text} onPress={() => changeLanguages().then(() => {
            if (checkedLanguage === 'Arabic العربيه') {
              strings.setLanguage('ar')
              I18nManager.forceRTL(true)
              I18nManager.allowRTL(true)
              RNRestart.Restart();
            }
            else if (checkedLanguage === 'English') {
              strings.setLanguage('en')
              I18nManager.forceRTL(false)
              I18nManager.allowRTL(false)
              RNRestart.Restart();
            }
            else if (checkedLanguage === 'French') {
              strings.setLanguage('fr')
              I18nManager.forceRTL(false)
              I18nManager.allowRTL(false)
              RNRestart.Restart();
            }
          })}>
            {strings.Ok}</Button>
        </Dialog.Actions>
      </Dialog>

    </View>
  )
}
const styles = StyleSheet.create({
  viewchange: {
    flexDirection: 'row',
    marginTop: 30
  },
  icon: {
    fontSize: 25,
    color: '#F85F6A'
  },
  textchanges: {
    fontSize: 20,
    color: '#F85F6A',
    marginLeft: 30
  },
  texts: {
    color: '#999999',
    marginLeft: 40
  },
  viewcontainershare: {
    width: window.width / 1.2,
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
    marginLeft: 10,
    marginTop: 50
  },
  viewshare: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around'
  },
  textshare: {
    fontSize: 20, color: '#F85F6A'
  },
});

export default Settings