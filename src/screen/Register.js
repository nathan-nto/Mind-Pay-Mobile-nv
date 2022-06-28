import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import bear from '../../assets/bear.png';
// import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
// import * as MediaLibrary from 'expo-media-library';

import Auth from '../components/InputAuth';
import ButtonStyle from '../components/ButtonStyle';
import InputConta from '../components/InputAgencia';
import styles from '../styles/global';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import useApi from '../hooks/useApi';
import { TextInputMask } from 'react-native-masked-text';

export default function Register({ navigation }) {
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const { data, mutate } = useApi('/user');
  const [nasci, setNasci] = useState('');

  const input = {
    width: '90%',
    height: 30,
    borderBottomColor: '#A74F4F',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 15,
    color: '#FFF',
    opacity: 0.6,
  };

  useEffect(() => {
    (async () => {
      if (data) {
        await AsyncStorage.multiSet([['@CodeApi:user', JSON.stringify(data)]]);
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));
        setUser(user);
      }
    })();
  }, [data, mutate]);

  async function pickImage() {
    const { status } = await MediaLibrary.requestPermissionsAsync(
      MediaLibrary.PermissionStatus
    );
    // const { status } = await Permissions.askAsync(
    //   Permissions.MEDIA_LIBRARY_WRITE_ONLY
    // );
    if (status !== 'granted') {
      alert('A permissão para acessar a galeria não foi permitida!');
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        //pegando o caminho da imagem
        setImage(result);
        const imagesData = new FormData();
        imagesData.append('file', {
          uri: result.uri,
          type: 'image/jpeg',
          name: 'test.jpg',
        });
        await api.patch('/user/profile/', imagesData);
        const resposta = await api.get('/user');
        user.profile_image = resposta.data.profile_image;
        console.log(resposta.data);
        await AsyncStorage.multiSet([
          ['@CodeApi:user', JSON.stringify(resposta.data)],
        ]);
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function register() {
    try {
      if (
        user.bank &&
        user.agency_number != 0 &&
        password != '' &&
        user.account &&
        user.nickname
      ) {
        const response = await api.put('/register', {
          nickname: user.nickname,
          bank: user.bank,
          account: user.account,
          agency_number: user.agency_number,
          data_de_nascimento: nasci,
          pix: user.pix,
          password,
        });
        // console.log(response.data);
        const resposta = await api.get('/user');
        await AsyncStorage.multiSet([['@CodeApi:user', JSON.stringify(user)]]);

        navigation.navigate('TabBars');
      } else {
        Alert.alert('Erro', 'Há informações não informadas!');
      }
    } catch (err) {
      Alert.alert('Erro', 'Há informações não informadas!');
    }
  }

  return (
    <ScrollView style={styles.scrol}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
        style={[
          styles.container,
          { marginBottom: Platform.OS == 'ios' ? 200 : 100 },
        ]}
      >
        <StatusBar style="light" />
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              image == null
                ? require('../../assets/bear.png')
                : { uri: image.uri }
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.editImage}>Editar Imagem</Text>
        <Text style={styles.facaLogin}>Complete seu cadastro:</Text>
        <Auth
          title="Marreco"
          nome="Apelido"
          change={(value) => (user.nickname = value)}
        />
        <Auth
          title="******"
          change={(value) => setPassword(value)}
          nome="Senha"
          secure={true}
        />
        <Auth
          title="Bradesco"
          change={(value) => (user.bank = value)}
          nome="Banco"
        />

        <Auth
          title="Pix"
          change={(value) => (user.pix = value)}
          nome="Pix"
        />

        <InputConta
          nome="Agencia"
          nomeSegundo="Conta"
          changeConta={(value) => (user.account = value)}
          changeAgency={(value) => (user.agency_number = value)}
          placeholderPrimeiro="1570"
          placeholderSegundo="1258977-8"
        />
        <Text style={styles.text}>Data de Nascimento</Text>
        <TextInputMask
          style={input}
          placeholder="03/04/2000"
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={nasci}
          onChangeText={(text) => setNasci(text)}
        />
        <ButtonStyle name="Atualizar" funcao={register} edit={true} />
        <TouchableOpacity
          onPress={async () => {
            // try {
            //   const response = await api.put(`/register`, {
            //     nickname: user.nickname,
            //     bank: user.bank,
            //     account: user.account,
            //     agency_number: user.agency_number,
            //     token_user: null,
            //   });
              AsyncStorage.clear();
              navigation.navigate('Login');
            // } catch (err) {
            //   AsyncStorage.clear();
            //   navigation.navigate('Login');
            //   console.log(err);
            // }
          }}
        >
          <Text style={styles.textButton}>Sair</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
