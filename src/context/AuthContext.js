import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApi from '../hooks/useApi';
import { mutate } from 'swr';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const { data } = useApi('/user')

  const [image, setImage] = useState(null)

  const signIn = useCallback(async ({ cpf, password, expoPushToken }) => {
    try {
      const response = await api.post('/login', {
        cpf,
        password,
        token_user: expoPushToken,
      });

      const { token, user } = response.data;
      console.log()

      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],

      ]);
      delete user.password

      setUsuario(user)
      if (!user.finished_registration) return 0;

      return 1;

    } catch (err) {
      console.log(err)
      Alert.alert('Credenciais inválidas');
      return false;
    }
  }, [usuario]);

  const updateUser = useCallback(async (data) => {
    try {
      if (data.password == '') {
        delete data.password
      }

      const response = await api.put('/register', data);
      setUsuario({ ...usuario, ...data })

      Alert.alert(response.data)

      return true;

    } catch (err) {
      console.log(err)
      Alert.alert('Credenciais inválidas');
      return false;
    }
  }, [usuario]);

  const updateImage = useCallback(async (image) => {
    try {
      const resp = await api.patch('/user/profile/', image)
      mutate('/user')
      Alert.alert(resp.data)

    } catch (err) {
      console.log(err)
      Alert.alert('Erro ao alterar imagem');
      return false;
    }
  }, []);

  useEffect(() => {
    if (data) {
      delete data.password
      setUsuario(data)
    }
  }, [data])

  const loadingUser = useCallback(async (image) => {
    try {
      const resp = await api.get('/user', image)

      Alert.alert(resp.data)

    } catch (err) {
      console.log(err)
      Alert.alert('Erro');
      return false;
    }
  }, []);

  const sendSalary = useCallback(async ({ amount, extra_hour, description }) => {
    try {

      if (extra_hour) {
        const resp = await api.post('/request', {
          amount: amount,
          extra_hour: extra_hour,
          description: description,
        })

      } else {
        const resp = await api.post('/request', {
          amount: amount,
          extra_hour: 0,
          description: 'Pagamento Mensal',
        })
      }
      return true;

    } catch (err) {
      console.log(err.data);
      Alert.alert(err.data.message);
      return false;
    }
  })

  const logout = useCallback(async () => {
    try {

      if (usuario) {
        await api.put('/register', {
          ...usuario,
          expoPushToken: null
        })
      }
      await AsyncStorage.removeItem("@CodeApi:token")

    } catch (err) {
      await AsyncStorage.removeItem("@CodeApi:token")
      return false;
    }
  }, []);

  const forgot = useCallback(async ({ email }) => {
    try {

      if (email) {
        await api.post("pass/forgotPassword", {
          email: email
        })
      }

      return true;

    } catch (err) {
      console.log(err)
      Alert.alert(err.response.data.error.message)
      return false;
    }
  }, []);

  const reset = useCallback(async ({ email, token }) => {
    try {

      const resp = await api.post("pass/resetPassword", {
        code: token,
        email: email
      })

      return true;

    } catch (err) {
      console.log(err.data.message)
      Alert.alert("Error",err.data.message || "Ops...Ocorreu um erro!")
      return false;
    }
  }, []);


  const updatePassword = useCallback(async ({ email, password }) => {
    try {
      console.log(email)

      const resp = await api.put("pass/updatePassword", {
        email: email,
        password: password
      })

      return true;

    } catch (err) {
      console.log(err)
      Alert.alert(err.response.data.error.message)
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        updatePassword,
        reset,
        forgot,
        signIn,
        updateUser,
        updateImage,
        loadingUser,
        sendSalary,
        logout,
        usuario,
        setUsuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export { AuthContext, AuthProvider }