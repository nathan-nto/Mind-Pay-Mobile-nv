import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
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
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import bear from '../../assets/bear.png';

import Auth from '../components/InputAuth';
import InputConta from '../components/InputAgencia';
import styles from '../styles/global';
import ButtonStyle from '../components/ButtonStyle';
import api from '../services/api';
import useApi from '../hooks/useApi';
import { TextInputMask } from 'react-native-masked-text';
import mind from '../../assets/mind-logo-comprido-branco.png';

export default function Edit({ navigation }) {
  const [amount, setAmount] = useState(0);
  const [moneyField, setMoneyField] = useState(null);
  const [description, setDescription] = useState('');
  const [users, setUser] = useState('')
  const { data } = useApi('/user')

  async function getSalary() {
    const usuario = await JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))
    setUser(usuario)
    console.log(usuario)
  }

  useEffect(() => {
    if (data) {
      getSalary()
    }
  }, [data])

  const input = {
    width: '90%',
    height: 100,
    borderColor: '#FFF',
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 15,
    color: '#FFF',
    opacity: 0.7,
    paddingLeft: 10,
  };
  const updateSalary = async () =>{
    try { 
      if(amount != 0){
        await api.post(`/request`, {
          amount: moneyField.getRawValue() + users?.base_salary,
          extra_hour:moneyField.getRawValue(),
          description,
        });
      Alert.alert('Sucesso!', 'Sua Requisição foi enviada com sucesso!');

      }
      else {
        console.log('fgdfgdg')
        console.log(users?.base_salary)
           await api.post(`/request`, {
            amount:users?.base_salary,
            extra_hour:0,
            description: "Pagamento Mensal",
      })
      Alert.alert('Sucesso!', 'Sua Requisição foi enviada com sucesso!');
    }

      setAmount(0);
      setDescription('');
    } catch (err) {
      Alert.alert(
        'Erro!', err?.message || 
        'Ops, ocorreu um erro verique suas informações!'
      );
    }
  }

  const handleAmountChange = useCallback(
    (action) => {
      setAmount(action);
    },
    [amount]
  );

  const handleDescriptionChange = useCallback(
    (action) => {
      setDescription(action);
    },
    [description]
  );

  return (
    <ScrollView style={estilos.scrol}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'height' : 'height'}
        style={[styles.container, { marginBottom: 200 }]}
      >
        <StatusBar style="light" />

        <Image style={estilos.image} source={mind} />
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          {' '}
          Insira os seus dados de pagamento!
        </Text>

        <Text style={estilos.text}>Altere o Salario Base no Perfil</Text>
        <TextInputMask
          style={estilos.input}
          type={'money'}
          placeholder="Altere o Salario Base no Perfil"
          value={users?.base_salary}
          editable={false}
        />

        <Text style={estilos.text}>Hora Extra</Text>
        <TextInputMask
          style={estilos.input}
          type={'money'}
          placeholder="R$ 1500,00"
          onChangeText={handleAmountChange}
          value={amount}
          ref={(ref) => setMoneyField(ref)}
        />


        {/* <Auth
          title="1300.00"
          change={(value) => setAmount(value)}
          nome="Valor Pagamento em R$"+
          edit={true}
          value={amount}
          enableNumber={true}
        /> */}

        <Text style={estilos.textDescr}>Descrição:</Text>
        <TextInput
          style={input}
          multiline={true}
          numberOfLines={5}
          returnKeyType="done"
          onChangeText={handleDescriptionChange}
          placeholder="EX: Pagamento Mensal"
          value={description}
          autoCorrect={false}
          placeholderTextColor="#FFF"
          maxLength={300}
        ></TextInput>
        <ButtonStyle name="Enviar" funcao={updateSalary} edit={true} />
        <TouchableOpacity
          onPress={async () => {
            try {
              const response = await api.put(`/register`, {
                ...users,
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
        >
          <Text style={styles.textButton}>Sair</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const estilos = StyleSheet.create({
  textDescr: {
    fontSize: 14,
    lineHeight: 14,
    marginLeft: 20,
    marginBottom: 10,
    color: '#B87979',
    alignSelf: 'flex-start',
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 150,
    alignContent: 'flex-start',
    resizeMode: 'contain',
    marginBottom: 40,
  },
  scrol: {
    backgroundColor: '#2E2E2E',
    paddingTop: '40%',
  },
  input: {
    width: '90%',
    height: 30,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 15,
    color: '#FFF',
    opacity: 0.6,
  },
  text: {
    fontSize: 15,
    lineHeight: 14,
    marginLeft: 20,
    color: '#B87979',
    alignSelf: 'flex-start',
  },
});
