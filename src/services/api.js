import { create } from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../config/baseUrl';


// 'http://162.214.54.8:3376/'
// 'http://192.168.0.8:3333/'
const api = create({
  // baseURL: 'http://162.214.160.241:33/',
  baseURL: baseUrl.URL,
  // baseURL: 'https://mindpay.mindconsulting.com.br/api',
});
api.addAsyncRequestTransform((request) => async () => {
  const token = await AsyncStorage.getItem('@CodeApi:token');
  
  if (token) request.headers['Authorization'] = `${token}`;
});
api.addResponseTransform((response) => {
  if (!response.ok) throw response;
});

export default api;
