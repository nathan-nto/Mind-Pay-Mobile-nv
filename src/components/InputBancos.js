import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import bancos from 'bancos-brasileiros';
import Autocomplete from 'react-native-autocomplete-input';

export default (props) => {
  const [bank, setBank] = useState([bancos]);
  const input = {
    width: '90%',
    height: 30,
    borderBottomColor: props.edit === true ? '#FFF' : '#A74F4F',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 15,
    color: '#FFF',
    opacity: 0.4,
  };

  if (bank == []) {
    <View />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.nome}</Text>
      <Autocomplete
        placeholderTextColor="#FFF"
        autoCapitalize="none"
        autoCorrect={false}
        data={bank.Name}
        defaultValue={props.value}
        returnKeyType="done"
        onChangeText={props.change}
        renderItem={(item, index) => (
          <TouchableOpacity onPress={props.press}>
            {console.log(item)}
            <Text>aaaas</Text>
          </TouchableOpacity>
        )}
      />
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
    fontSize: 10,
    lineHeight: 14,
    marginLeft: 20,
    color: '#B87979',
    alignSelf: 'flex-start',
  },
});
{
  /* <TextInput
editable={props.edit}
placeholder={props.title}
style={input}
secureTextEntry={props.secure ? true : false}
onChangeText={props.change}
keyboardType={props.enableNumber === true ? "numeric": "default"}
>
{props.value}
</TextInput> */
}
