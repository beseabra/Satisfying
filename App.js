import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import ModificarPesquisa from './src/pages/ModificarPesquisa';
import NewAccount from './src/pages/NewAccount';
import NewPassword from './src/pages/NewPassword';
import NovaPesquisa from './src/pages/NovaPesquisa';
import Rating from './src/pages/Rating';
import Report from './src/pages/Report';
import SearchAction from './src/pages/SearchAction';
import ThanksScreen from './src/pages/ThanksScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: '#372775',
              elevation: 0,
            },
            headerTintColor: '#372775',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity onPress={() => {/* coloque a ação do drawer aqui */}}>
              <Icon name="menu" size={40} color="#fff" /> 
            </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#2B1D62',
              elevation: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{
            headerStyle: {
              backgroundColor: '#2B1D62', // Cor da barra de navegação
            },
            headerTintColor: '#fff', // Cor do texto na barra de navegação
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="NewAccount"
          component={NewAccount}
          options={{
            headerStyle: {
              backgroundColor: '#2B1D62', // Cor da barra de navegação
            },
            headerTintColor: '#fff', // Cor do texto na barra de navegação
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Search Action"
          component={SearchAction}
          options={{
            headerStyle: {
              backgroundColor: '#372775',
              elevation: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            headerStyle: {
              backgroundColor: '#372775',
              elevation: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        
        <Stack.Screen
          name="Nova pesquisa"
          component={NovaPesquisa}
          options={{
            headerStyle: {
              backgroundColor: '#2B1D62', // Cor da barra de navegação
            },
            headerTintColor: '#fff', // Cor do texto na barra de navegação
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold'
            },
          }}
        />
        <Stack.Screen
          name="Modificar pesquisa"
          component={ModificarPesquisa}
          options={{
            headerStyle: {
              backgroundColor: '#2B1D62', // Cor da barra de navegação
            },
            headerTintColor: '#fff', // Cor do texto na barra de navegação
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold'
            },
          }}
        />
        <Stack.Screen
          name="ThanksScreen"
          component={ThanksScreen}
          options={{
            headerStyle: {
              backgroundColor: '#372775',
              elevation: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Rating"
          component={Rating}
          options={{
            headerStyle: {
              backgroundColor: '#372775',
              elevation: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
       

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
