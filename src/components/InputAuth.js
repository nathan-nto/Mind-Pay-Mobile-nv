import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

export default (props) => {
  const input = {
    width: '90%',
    height: 30,
    borderBottomColor: props.edit === true ? '#FFF' : '#A74F4F',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 15,
    color: '#FFF',
    opacity: 0.6,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.nome}</Text>
      <TextInput
        placeholderTextColor="#D3D3D3"
        editable={props.edit}
        placeholder={props.title}
        returnKeyType="done"
        style={input}
        secureTextEntry={props.secure ? true : false}
        onChangeText={props.change}
        keyboardType={props.enableNumber === true ? 'numeric' : 'default'}
        maxLength={40}
      >
        {props.value}
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
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
