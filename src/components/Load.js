import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import LottieView from 'lottie-react-native';


export function Load({visible,svgLoading }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          source={svgLoading}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E2E2E'
  },

  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  },
});