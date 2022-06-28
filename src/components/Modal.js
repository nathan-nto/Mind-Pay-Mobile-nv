import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import baseUrl from '../config/baseUrl';

export default (props) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: baseUrl.URL + '/media/1602518237517.jpeg',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    alignContent: 'flex-start',
  },
});
