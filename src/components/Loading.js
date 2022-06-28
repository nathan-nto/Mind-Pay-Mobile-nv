import React, { useState, useEffect } from 'react';
import { Modal, View, Image, StyleSheet } from 'react-native';

export default function Loading() {
  const loadingMind = '../../assets/loadingMind.gif';
  const [isVisible, setIsVisible] = useState(true);

  const loadingModal = async () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  useEffect(() => {
    loadingModal();
  }, []);

  return (
    <Modal visible={isVisible}>
      <View style={styles.container}>
        <Image style={styles.image} source={require(loadingMind)}></Image>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});
