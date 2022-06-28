import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';
import mind from '../../assets/mind-logo-comprido-branco.png';
import receipt from '../../assets/document.png';
import api from '../services/api';
import baseUrl from '../config/baseUrl';
import useApi from '../hooks/useApi'

export default function HistoryPayment({ navigate }) {
  const {data} = useApi('/request')
  const [allHistory, setAllHistory] = useState([]);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const history = async () => {
    const resp = await api.get(`/request`);
    const paygament = resp.data;
    setAllHistory(paygament);
    setRefresh(false);
  };

  useEffect(() => {
    console.log(data)
    if(data){
    
      setAllHistory(data);
    }
    // history();
  }, [data]);
  const handleRefresh = () => {
    setRefresh(true);
    history();
  };

  // const ordenarPorData = (a, b) => a.created_at > b.created_at;

  const headerItem = () => (
    <View>
      <Image fadeDuration={0} style={styles.image} source={mind} />
      <Text style={styles.textHeader}> Histórico de pagamento</Text>
    </View>
  );

  const renderItem = (item) => {
    let color;
    if (item.item.receipt_location) {
      color = '#00FF19';
    } else {
      color = '#ff0000';
    }
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (item.item.receipt_location != null) {
            setModalVisible(true);
            setImage(item.item.receipt_location);
          }
        }}
      >
        <Image
          fadeDuration={0}
          style={{ height: 30, width: 30, marginLeft: '10%' }}
          source={receipt}
        />
        <Text style={styles.textButtons}>{item.item.created_at}</Text>
        <View
          style={{
            width: 7,
            height: 7,
            backgroundColor: color,
            borderRadius: 100,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <Image
            style={styles.imageModal}
            source={{ uri: `${baseUrl.URL}/media/${image}` }}
          />
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <FlatList
        data={allHistory}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={headerItem}
        onRefresh={() => handleRefresh()}
        refreshing={refresh}
        bounces={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '15%',
    width: '100%',
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 150,
    alignContent: 'flex-start',
    resizeMode: 'contain',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    width: '96%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderColor: '#fff',
    borderWidth: 1,
  },
  textHeader: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 50,
  },
  imageModal: {
    height: '80%',
    width: '90%',
    resizeMode: 'contain',
  },
  buttonModal: {
    marginTop: 20,
    width: '90%',
    height: 50,
    backgroundColor: '#D52247',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontFamily: 'Montserrat_100Thin',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 21,
    color: '#FFFFFF',
  },
  textButtons: {
    color: '#fff',
  },
});
