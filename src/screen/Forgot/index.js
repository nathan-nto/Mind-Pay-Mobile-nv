import React, { useRef, useContext, useState } from 'react'
import { Container, TxtBtn, } from './styles'
import { Alert } from 'react-native'
import Button from '../../components/Button'
import { Form } from '@unform/mobile'
import Input from '../../components/Input'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import loadAnimation from '../../assets/forgot.json';
import { Load } from '../../components/Load'



export default function Forgot({ navigation }) {
  const formRef = useRef(null)
  const { forgot } = useContext(AuthContext)
  const [load, setLoad] = useState(false)


  async function handleSubmit(data) {
    try {
      setLoad(true)
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email()
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const resp = await forgot({
        email: data.email
      });

      setLoad(false)
      if (resp === true) {
        Alert.alert("Token enviado para o seu email")
        navigation.navigate('Reset', { Email: data.email })
      }

      // Validation passed

    } catch (err) {
      setLoad(false)
      console.log(err)

      if (err instanceof Yup.ValidationError) {
        const error = getValidationError(err);
        formRef.current?.setErrors(error);

        return;
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao recuperar a senha',
      );

    }
  }

  return (
    <Container>

      <Load visible={load} svgLoading={loadAnimation} />

      <TxtBtn>Digite seu E-mail</TxtBtn>

      <Form onSubmit={handleSubmit} ref={formRef} style={{ width: '90%' }}>
        <Input name='email' placeholder="E-mail" icon="mail" />
      </Form>

      <Button onPress={() => formRef.current?.submitForm()}>Enviar</Button>

    </Container>
  )
}
