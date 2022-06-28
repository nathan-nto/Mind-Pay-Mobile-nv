import React, { useState, useRef, useContext } from 'react'
import { StatusBar, TouchableOpacity, ScrollView, Text, Alert } from 'react-native'
import Input from '../../components/Input'
import { Container, Image, TxtEdit, TxtRegister, BtnAlterar, TxtBtn } from './styles'
import { Form } from '@unform/mobile'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
// import * as MediaLibrary from 'expo-media-library';
import InputMasked from '../../components/InputMasked'
import Button from '../../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup'
import getValidationError from '../../utils/getValidationError'
import { AuthContext } from '../../context/AuthContext'
import { getValidationMoney } from '../../utils/getValidationMoney'
import baseUrl from '../../config/baseUrl'


export default function NewResgister({navigation}) {
  const { updateUser,usuario,updateImage } = useContext(AuthContext)
  const [image, setImage] = useState(null);
  const [date,setDate] = useState('')
  const [money,setMoney] = useState('')
  const formRef = useRef(null)

  async function pickImage() {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
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

        const resp = await updateImage(imagesData)
        // await api.patch('/user/profile/', imagesData);
        // const resposta = await api.get('/user');
        // user.profile_image = resposta.data.profile_image;
        // console.log(resposta.data);
        // await AsyncStorage.multiSet([
        //   ['@CodeApi:user', JSON.stringify(resposta.data)],
        // ]);
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function handleSubmit(data) {
    try {
      
      if(data.base_salary)
      data.base_salary = getValidationMoney(data.base_salary)
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        nickname: Yup.string()
          .required('Insira seu Nome/Apelido'),
        password: Yup.string()
          .required('Senha é Obrigatória'),
        data_de_nascimento: Yup.string()
          .required('Data é Obrigatória'),
        base_salary: Yup.number()
          .required('Salario Base é Obrigatório'),
        bank: Yup.string()
          .required('Banco é Obrigatório'),
        agency_number: Yup.string()
          .required('Agencia é Obrigatória'),
        account: Yup.string()
          .required('Conta é Obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const resp = await updateUser(data);
 
      if(resp === true){
        navigation.navigate('TabBars')
      }
      // Validation passed
    } catch (err) {
      console.log(err)

      if (err instanceof Yup.ValidationError) {
        const error = getValidationError(err);

        formRef.current?.setErrors(error);
        return;
      }

      Alert.alert(
        'Erro na Edição',
        'Ocorreu um erro ao alterar, cheque as credenciais',
      );

    }
  }

  return (
    <KeyboardAwareScrollView>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >

        <StatusBar style="light" />
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              usuario?.profile_image
              ? { uri: `${baseUrl.URL}/media/${usuario.profile_image}` }
              : require('../../../assets/bear.png')
            }
          />
        </TouchableOpacity>

        <TxtEdit>Editar Imagem</TxtEdit>
        <TxtRegister>Complete seu cadastro:</TxtRegister>

        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '90%' }}>

          <Input maxLength={60} name='nickname' placeholder="Apelido" icon="user" />
          <Input maxLength={20} name='password' placeholder="Senha" secureTextEntry={true} icon="lock" senha={true} />
          <InputMasked
            rawText={date}
            setRawText={setDate}
            type="datetime"
            options={{
              format: 'DD/MM/YYYY',
            }}
    
            name='data_de_nascimento'
            placeholder="Data de Nascimento"
            icon="calendar"
          />
          <InputMasked
            rawText={money}
            setRawText={setMoney}
            type="money"
            name='base_salary'
            placeholder="Salário Base"
            icon="dollar-sign" />
          <Input maxLength={30} name='bank' placeholder="Banco" icon="database" />
          <Input maxLength={4} name='agency_number' placeholder="Agencia" icon="briefcase" />
          <Input name='account' placeholder="Conta" icon="credit-card" />

          <Button onPress={() => formRef.current?.submitForm()}>Atualizar</Button>
          {/* <BtnAlterar>
            <TxtBtn>Atualizar</TxtBtn>
          </BtnAlterar> */}

        </Form>


      </Container>
    </KeyboardAwareScrollView>
  )
}