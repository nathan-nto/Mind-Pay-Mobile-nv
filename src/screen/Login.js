import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import mind from '../../assets/mindpay-logo-tipo-letra-branca.png';
import { TextInputMask } from 'react-native-masked-text';
import api from '../services/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [password, setPassword] = useState('');
  const [clico, setClico] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  const register = useCallback(async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        console.log('pemissão', existingStatus);

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;

        setExpoPushToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [expoPushToken]);

  useEffect(() => {
    register();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const loadingScreen = useCallback(async () => {
    if (JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))) {
      navigation.navigate('TabBars');
    } else {
      AsyncStorage.clear();
    }
  }, []);

  useEffect(() => {
    loadingScreen();
  }, []);

  async function signIn() {
    try {
      const response = await api.post('/login', {
        cpf: cpfField.getRawValue(),
        password,
        token_user: expoPushToken,
      });
      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);
      if (!user.finished_registration) navigation.navigate('Bem-Vindo');
      else if (user.finished_registration) navigation.navigate('TabBars');
      else {
        Alert.alert('Falha!', 'credenciais incorretas!');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', 'credenciais incorretas!');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image style={styles.image} source={mind} />
      <StatusBar style="auto" />
      <TextInputMask
        placeholderTextColor="#FFF"
        placeholder="CPF"
        type={'cpf'}
        value={cpf}
        style={styles.input}
        onChangeText={(text, ref = null) => {
          setCpf(text);
        }}
        ref={(ref) => {
          setCpfField(ref);
        }}
        autoCapitalize="none"
        onFocus={() => {
          setClico(true);
        }}
        onBlur={() => {
          setClico(false);
        }}
        returnKeyType="done"
      />
      <TextInput
        secureTextEntry={true}
        placeholderTextColor="#FFF"
        placeholder="Senha"
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        returnKeyType="done"
        onFocus={() => {
          setClico(true);
        }}
        onBlur={() => {
          setClico(false);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => signIn()}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    minWidth: '100%',
    backgroundColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    marginTop: 30,
    fontSize: 20,
    opacity: 0.7,
    color: '#FFF',
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    alignContent: 'flex-start',
    resizeMode: 'contain',
  },
  button: {
    marginTop: 20,
    width: '80%',
    height: 50,
    backgroundColor: '#D52247',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontFamily: 'Montserrat_100Thin',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 21,
    color: '#FFFFFF',
  },
  scrol: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    paddingTop: '50%',
  },
});
