import React, { useReducer } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
//import styles from "../styles/global";

export default (props) => {
  const accountAgency = {
    inputAgencia: {
      alignSelf: 'flex-start',
      width: props.enableString ? '75%' : '45%',
      height: 30,
      borderBottomColor: props.edit === true ? '#FFF' : '#A74F4F',
      borderBottomWidth: 1,
      marginBottom: 20,
      fontSize: 15,
      color: '#FFF',
      opacity: 0.6,
      marginLeft: '51%',
    },
    textInputAgencia: {
      fontSize: 10,
      lineHeight: 14,
      marginLeft: props.enableString ? '10%' : '13%',
      color: '#B87979',
      alignSelf: 'center',
    },
    inputConta: {
      width: props.enableString ? '20%' : '47%',
      height: 30,
      borderBottomColor: props.edit === true ? '#FFF' : '#A74F4F',
      borderBottomWidth: 1,
      alignSelf: props.enableString ? 'flex-end' : 'flex-start',
      fontSize: 18,
      color: '#FFF',
      marginLeft: '5%',
      opacity: 0.6,
      marginRight: props.enableString ? '50%' : 0,
    },
    text: {
      fontSize: 10,
      lineHeight: 14,
      marginLeft: props.enableString ? '30%' : '5%',
      color: '#B87979',
      alignSelf: 'flex-start',
    },
  };

  return (
    <View style={styles.containerInputs}>
      <View style={styles.inputs}>
        <Text style={accountAgency.textInputAgencia}>{props.nome}</Text>
        <TextInput
          placeholderTextColor="#D3D3D3"
          placeholder={props.placeholderPrimeiro}
          onChangeText={props.changeAgency}
          style={accountAgency.inputAgencia}
          editable={props.edit}
          returnKeyType="done"
          keyboardType={props.enableString === true ? 'default' : 'numeric'}
          maxLength={20}
        >
          {props.valueAgency}
        </TextInput>
      </View>
      <View style={styles.inputs}>
        <Text style={accountAgency.text}>{props.nomeSegundo}</Text>
        <TextInput
          placeholderTextColor="#D3D3D3"
          placeholder={props.placeholderSegundo}
          onChangeText={props.changeConta}
          style={accountAgency.inputConta}
          editable={props.edit}
          returnKeyType="done"
          maxLength={20}
        >
          {props.valueConta}
        </TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInputs: {
    flexDirection: 'row',
  },
  inputs: {
    width: '90%',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
