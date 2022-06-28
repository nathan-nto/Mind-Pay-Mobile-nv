import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import ButtonStyle from '../components/ButtonStyle';
import bear from '../../assets/bear.png';
import { AuthContext } from '../context/AuthContext';

export default function BemVindo({ navigation }) {
  const {usuario} = useContext(AuthContext)
  console.log(usuario)
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.image} source={bear} />

      <Text style={styles.textTitulo}> Bem vindo Minder!</Text>
      <View style={styles.containerText}>
        <Text style={styles.text}>Teremos que realizar</Text>
        <Text style={styles.text}>o primeiro cadastro.</Text>
        <Text style={styles.text}>Preencha as informações e</Text>
        <Text style={styles.text}>pressione em atualizar.</Text>
      </View>
      <ButtonStyle
        funcao={() => {
          navigation.navigate('NewRegister');
        }}
        name="Continuar"
        edit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    marginTop: 100,
    alignSelf: 'center',
    width: 150,
    height: 150,
    alignContent: 'flex-start',
  },
  textTitulo: {
    fontSize: 40,
    lineHeight: 40,
    marginTop: 20,
    marginBottom: 20,
    color: '#FFF',
    alignSelf: 'center',
    alignContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat_100Thin',
    fontSize: 20,
    lineHeight: 27,
    marginLeft: 20,
    color: '#FFF',
    alignSelf: 'flex-start',
  },
  containerText: {
    marginBottom: 90,
  },
});
