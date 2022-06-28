import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/global';

export default (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { display: props.edit ? 'flex' : 'none' }]}
      onPress={props.funcao}
    >
      <Text style={styles.textButton}>{props.name}</Text>
    </TouchableOpacity>
  );
};
