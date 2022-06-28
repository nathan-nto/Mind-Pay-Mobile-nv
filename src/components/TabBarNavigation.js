import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Profile from "../screen/EditUserNew";
// import Pagamento from "../screen/Pagamento";
import Pagamento from "../screen/PagamentoNew";
import HistoryPayment from "../screen/HistoryPayment";
import { color } from 'react-native-reanimated';

const TabBarComponent = (props) => (<BottomTabBar {...props} />);

const TabNavigator = createBottomTabNavigator({
  'Perfil': Profile,
  Pagamento: Pagamento,
  'Histórico': HistoryPayment,
  
}, {
  tabBarOptions: {
    activeTintColor: '#B87979',
    inactiveTintColor:'#fff',
    labelStyle: {
      fontSize: 12
  
    },
    style: {
      backgroundColor: '#2E2E2E',
      justifyContent: 'flex-start'
    },
    tabStyle: {
      paddingBottom:15    
    },
  }
});




export default createAppContainer(TabNavigator);