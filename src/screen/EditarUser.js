import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import bear from '../../assets/bear.png';
import Loading from '../components/Loading';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';
// import AsyncStorage from '@react-native-community/async-storage';

import Auth from '../components/InputAuth';
import InputConta from '../components/InputAgencia';
import styles from '../styles/global';
import ButtonStyle from '../components/ButtonStyle';
import api from '../services/api';
import { TextInputMask } from 'react-native-masked-text';
import useApi from '../hooks/useApi';

export default function Edit({ navigation }) {
  const [edit, setEdit] = useState(false);
  const [isModal, setIsModal] = useState(true);
  const [user, setUser] = useState('');
  // const urlImage = 'https://mindpay.mindconsulting.com.br/api/media';
  const urlImage = 'http://192.168.0.9:3333/media';
  const [password, setPassword] = useState(' ');
  const { data, mutate } = useApi('/user');
  const [nasci, setNasci] = useState(null);
  const [mindversario, setMindversario] = useState(null);
  const [image, setImage] = useState(null);
  const [salaryBase, setSalaryBase] = useState(null);
  const [amount, setAmount] = useState(0);
  const input = {
    width: '90%',
    height: 30,
    borderBottomColor: edit === true ? '#FFF' : '#A74F4F',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 15,
    color: '#FFF',
    opacity: 0.6,
  };

  useEffect(() => {
    loadingUser();
  }, [data, mutate]);

  useEffect(() => {
    findUser();
  }, []);

  const findUser = async () => {
    try {
      const resposta = await api.get('/user');
      if (resposta.data.profile_image) {
        setImage({ uri: urlImage + resposta.data.profile_image });
      }
      await AsyncStorage.multiSet([
        ['@CodeApi:user', JSON.stringify(resposta.data)],
      ]);
      const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));
      if (user?.data_de_nascimento) {
        setNasci(user?.data_de_nascimento);
      }
      setUser(user);
    } catch (err) {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    }
  };

  const loadingUser = async () => {
    if (data) {
      await AsyncStorage.multiSet([['@CodeApi:user', JSON.stringify(data)]]);
    }
    const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));
    setUser(user);
    setAmount(user?.base_salary)
    if (user.profile_image != null) {
      setImage({
        uri: `http://192.168.0.9:3333/media/${user.profile_image}`,
      });
    }
    setTimeout(() => {
      setIsModal(false);
    }, 2000);
  };

  async function pickImage() {
    const { status } = await MediaLibrary.requestPermissionsAsync(
      MediaLibrary.PermissionStatus
    );
    //Permissions.askAsync(
    //   Permissions.MEDIA_LIBRARY,
    //   Permissions.MEDIA_LIBRARY_WRITE_ONLY,
    //   Permissions.CAMERA_
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
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function updateUser() {
    if(salaryBase){
      user.base_salary = salaryBase.getRawValue()

    }

    try {
      if (password === ' ') {
        const response = await api.put(`/register`, {
          ...user,
          base_salary: salaryBase.getRawValue(),
        });
        
      } else {
        const response = await api.put(`/register`, {
          ...user,
          base_salary: salaryBase.getRawValue(),
          password,
        });
      }
    
      await AsyncStorage.multiSet([['@CodeApi:user', JSON.stringify(user)]]);
      setEdit(false);
      Alert.alert('Sucesso!', 'Informações Alteradas!');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro!', 'Algo deu errado!');
    }
  }

  const dateFunc = useCallback(
    (text) => {
      // const data = date.split('/').reverse().join('-').replace('_', '');
      // user?.data_de_nascimento = new Date(data);

      setNasci(text);
      user.data_de_nascimento = text;
    },
    [nasci]
  );

  const handleAmountChange = useCallback(
    (action) => {
      setAmount(action);
    },
    [amount]
  );

  return (
    <ScrollView style={estilos.scrol}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'height' : 'height'}
        style={[
          styles.container,
          { marginBottom: Platform.OS == 'ios' ? 200 : 200 },
        ]}
      >
        <StatusBar style="light" />
        <Loading />
        <TouchableOpacity onPress={edit ? pickImage : () => {}}>
          <Image
            fadeDuration={0}
            source={
              image == null
                ? require('../../assets/bear.png')
                : { uri: image.uri }
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <Text
          style={{
            display: edit ? 'flex' : 'none',
            color: '#FFF',
            alignSelf: 'center',
            marginLeft: '4%',
            marginTop: 10,
            opacity: 0.75,
            fontFamily: 'Montserrat_100Thin',
          }}
        >
          Editar Imagem
        </Text>
        <TouchableOpacity
          style={styles.iconEdit}
          onPress={() => setEdit(edit == true ? false : true)}
        >
          <Entypo name="edit" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            display: !edit ? 'flex' : 'none',
            color: '#FFF',
            alignSelf: 'flex-end',
            marginRight: '8%',
            opacity: 0.75,
            fontFamily: 'Montserrat_100Thin',
          }}
        >
          Editar
        </Text>
        <Auth
          title="Nadaleti"
          change={(value) => (user.nickname = value)}
          nome="Apelido"
          edit={edit}
          value={user.nickname}
        />
        <Auth
          secure={true}
          change={(value) => setPassword(value)}
          title="******"
          nome="Senha"
          edit={edit}
        />

        <Text style={styles.text}>Data de Nascimento</Text>
        <TextInputMask
          placeholder="03/04/2000"
          editable={edit}
          style={input}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={nasci}
          onChangeText={(text) => dateFunc(text)}
        />
        


        <Text style={styles.text}>Mindversário</Text>
        <TextInputMask
          placeholder="03/04/2016" 
          style={input}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={mindversario}
        />
      


        <Text style={styles.text}>Salario Base</Text>
        <TextInputMask
          placeholder="R$ 1000,00"
          editable={edit}
          style={input}
          type={'money'}
          value={amount}
          // value={user?.base_salary}
          // defaultValue={user?.base_salary}
          onChangeText={handleAmountChange}
          ref={(text) => setSalaryBase(text)}
        />

        <Auth
          title="Santander"
          change={(value) => (user.bank = value)}
          nome="Banco"
          edit={edit}
          value={user.bank}
          press={(item) => (user.bank = item)}
        />



        <Auth
          title="Pix"
          change={(value) => (user.pix = value)}
          nome="Pix"
          edit={edit}
          value={user.pix}
          press={(item) => (user.pix = item)}
        />



        <InputConta
          edit={edit}
          changeConta={(value) => (user.account = value)}
          changeAgency={(value) => (user.agency_number = value)}
          valueConta={user.account}
          valueAgency={user.agency_number}
          nome="Agencia"
          nomeSegundo="Conta"
          placeholderPrimeiro="1570"
          placeholderSegundo="1258977-8"
        />

        <ButtonStyle name="Salvar" funcao={updateUser} edit={edit} />
        {edit ? (
          <TouchableOpacity
            onPress={async () => {
              try {
                const response = await api.put(`/register`, {
                  nickname: user.nickname,
                  bank: user.bank,
                  pix: user.pix,
                  account: user.account,
                  agency_number: user.agency_number,
                  token_user: null,
                });

                //nome a esquerda é api e a direita é o front

                AsyncStorage.clear();
                navigation.navigate('Login');
              } catch (err) {
                AsyncStorage.clear();
                navigation.navigate('Login');
                console.log(err);
              }
            }}
          >
            <Text style={styles.textButton}>Sair</Text>
          </TouchableOpacity>
        ) : (
          <ButtonStyle
            name="Sair"
            funcao={async () => {
              try {
                const response = await api.put(`/register`, {
                  nickname: user.nickname,
                  bank: user.bank,
                  account: user.account,
                  agency_number: user.agency_number,
                  token_user: null,
                });
                AsyncStorage.clear();
                navigation.navigate('Login');
              } catch (err) {
                AsyncStorage.clear();
                navigation.navigate('Login');
                console.log(err);
              }
            }}
            edit={true}
          />
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const estilos = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 14,
    marginLeft: 20,
    marginBottom: 10,
    color: '#B87979',
    alignSelf: 'flex-start',
  },
  textEdit: {
    color: '#FFF',
    alignSelf: 'flex-end',
    marginLeft: '3%',
    opacity: 0.75,
    fontFamily: 'Montserrat_100Thin',
  },
  textEditImage: {
    color: '#FFF',
    alignSelf: 'center',
    marginLeft: '5%',
    opacity: 0.75,
    fontFamily: 'Montserrat_100Thin',
  },
  scrol: {
    backgroundColor: '#2E2E2E',
    paddingTop: '10%',
  },
  container: {
    backgroundColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  text: {
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 20,
    color: '#B87979',
    alignSelf: 'flex-start',
  },
});
