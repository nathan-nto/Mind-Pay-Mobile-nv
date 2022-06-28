import React, { useState, useRef, useContext, useEffect } from 'react'
import { StatusBar, TouchableOpacity, ScrollView, Text, Alert } from 'react-native'
import Input from '../../components/Input'
import { Container, Image, TxtEdit, TxtRegister, BtnAlterar, TxtBtn, BtnEdit } from './styles'
import { Form } from '@unform/mobile'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';
import InputMasked from '../../components/InputMasked';
import Button from '../../components/Button';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup'
import getValidationError from '../../utils/getValidationError'
import { AuthContext } from '../../context/AuthContext'
import { getValidationMoney } from '../../utils/getValidationMoney'
import { Load } from '../../components/Load'
import baseUrl from '../../config/baseUrl'
import loadAnimation from '../../assets/bearLoading.json';


export default function NewResgister({navigation}) {

  const { usuario, updateUser, updateImage,logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [nasci, setNasci] = useState('');
  const [money, setMoney] = useState('');
  const [edit, setEdit] = useState(false);
  const formRef = useRef(null)
  const [raw, setRaw] = useState('')

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 4000)
  }, [])


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

      data.base_salary = getValidationMoney(data.base_salary)

      if (data.data_de_nascimento.toString().indexOf(" ") != -1)
        data.data_de_nascimento = data.data_de_nascimento.split(' ')[0]

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        nickname: Yup.string()
          .required('Insira seu Nome/Apelido'),
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
      // Validation passed
      const resp = await updateUser(data)

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

  useEffect(() => {
    if(!usuario){
      logout()
      navigation.navigate("Login")
    }
  },[])


  return (
    <KeyboardAwareScrollView>

      <Container
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >

        <Load visible={loading} svgLoading={loadAnimation} />
        <StatusBar style="light" />

        <Form initialData={usuario} ref={formRef} onSubmit={handleSubmit} style={{ width: '90%' }}>


          <TouchableOpacity onPress={edit ? pickImage : () => { }}>
            <Image
              source={
                usuario?.profile_image
                  ? { uri: `${baseUrl?.URL}/media/${usuario.profile_image}` }
                  : require('../../../assets/bear.png')

              }
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

          <BtnEdit
            onPress={() => setEdit(edit == true ? false : true)}
          >
            <Entypo name="edit" size={30} color="white" />
          </BtnEdit>
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

          <Input maxLength={60} name='nickname' placeholder="Apelido" icon="user" editable={edit} />
          <Input maxLength={20} name='password' placeholder="Senha" secureTextEntry={true} icon="lock" senha={true} editable={edit} />
          <InputMasked
            type="datetime"
            options={{
              format: 'DD/MM/YYYY',
            }}
            name='data_de_nascimento'
            placeholder="Data de Nascimento"
            icon="calendar"
            editable={edit}
            setRawText={setNasci}
            rawText={nasci}
          />
          <InputMasked rawText={money} setRawText={setMoney} type="money" name='base_salary' placeholder="Salário Base" icon="dollar-sign" editable={edit} />
          <Input maxLength={30} name='bank' placeholder="Banco" icon="database" editable={edit} />
          <Input name='agency_number' maxlenght={4} placeholder="Agencia" icon="briefcase" editable={edit} />
          <Input name='account' placeholder="Conta" icon="credit-card" editable={edit} />
          <Input name='pix' placeholder="Chave Pix" icon="credit-card" editable={edit} />

          {edit ? (<>
            <Button onPress={() => formRef.current?.submitForm()}>Atualizar</Button>
            <Button secudary={true}>Sair</Button>
          </>) : <Button onPress={() => 
            {
              logout()
              navigation.navigate("Login")
            }
          
          }

            >Sair</Button>}

        </Form>

      </Container>
    </KeyboardAwareScrollView>

  )
}