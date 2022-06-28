import React, { useRef, useContext, useState } from 'react'
import { Container, TxtBtn } from './styles'
import Button from '../../components/Button'
import { Alert } from 'react-native'
import { Form } from '@unform/mobile'
import Input from '../../components/Input'
import { AuthContext } from '../../context/AuthContext'
import loadAnimation from '../../assets/reset.json';
import { Load } from '../../components/Load'


export default function ResetPass({ navigation, route }) {
  const formRef = useRef(null)
  const [load, setLoad] = useState(false)
  const { reset, updatePassword } = useContext(AuthContext)


  const emailUser = navigation.getParam("Email")

  async function handleSubmit(data) {
    try {
      setLoad(true)
      // Remove all previous errors
      // formRef.current.setErrors({});

      // const schema = Yup.object().shape({
      //   email: Yup.string().email()
      // });
      // await schema.validate(data, {
      //   abortEarly: false,
      // });

      const resp = await reset({
        email: emailUser,
        token: data.token
      });

      if (resp === true) {
        const response = await updatePassword({
          email: emailUser,
          password: data.confirm
        })
        if (response == true) {
          Alert.alert("Nova Senha Criada")
          navigation.navigate("Login")
        }

      }
      setLoad(false)

      // Validation passed

    } catch (err) {
      setLoad(false)
      console.log(err)

      // if (err instanceof Yup.ValidationError) {
      //   const error = getValidationError(err);
      //   formRef.current?.setErrors(error);

      //   return;
      // }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao recuperar a senha',
      );

    }
  }

  return (
    <Container>

      <Load visible={load} svgLoading={loadAnimation} />
      <TxtBtn>Insira as Informações</TxtBtn>

      <Form onSubmit={handleSubmit} ref={formRef} style={{ width: '90%' }}>
        <Input name='token' placeholder="Código de recuperação" icon="key" />
        {/* <Input name='senha' placeholder="Nova Senha" icon="lock" /> */}
        <Input name='confirm' placeholder="Nova Senha" senha={true} secureTextEntry={true} icon="lock" />
      </Form>

      <Button onPress={() => formRef.current?.submitForm()}>Criar Senha</Button>

    </Container>
  )
}
