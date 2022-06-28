import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './screen/LoginNew';
import ForgotPass from './screen/Forgot';
import Reset from './screen/Reset';
import BemVindo from './screen/BemVindo';
import Register from './screen/Register';
import EditarUser from './screen/EditarUser';
import TabBars from './components/TabBarNavigation';
import Modal from './components/Modal';
import Teste from './screen/RegisterNew/NewRegister'

const MainNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions:{
        header:false
      }
    },
    TabBars: {
      screen: TabBars,
      navigationOptions:{
        header:false
      }
    },
    NewRegister: {
      screen: Teste,
      navigationOptions:{
        header:false
      }
    },
    'Bem-Vindo': {
      screen: BemVindo,
      navigationOptions:{
        header:false
      }
    },
    Register: {
      screen: Register,
      navigationOptions:{
        header:false
      }
    },
    Modal: {
      screen: Modal,
      navigationOptions:{
        header:false
      }
    },
    Forgot:{
      screen: ForgotPass,
      navigationOptions:{
        headerTitle: '', headerTintColor: '#ca375e', headerTransparent: true, headerStyle: { backgroundColor: '#2e2e2e' }

      }
    },
    Reset:{
      screen: Reset,
      navigationOptions:{
        headerTitle: '', headerTintColor: '#ca375e', headerTransparent: true, headerStyle: { backgroundColor: '#2e2e2e' }
        
      }
    }
   
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      gestureDirection: 'vertical',
      headerTintColor: '#ca375e',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#161616',
      },
    },
  }
);

const Routes = createAppContainer(MainNavigator);
export default Routes;
