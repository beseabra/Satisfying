import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './src/pages/Login';
import NewAccount from './src/pages/NewAccount';
import NewPassword from './src/pages/NewPassword';
import Home from './src/pages/Home';
import { TouchableOpacity } from 'react-native';
{/*import Icon from 'react-native-vector-icons/FontAwesome'*/}

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
              {/*<Icon name="facebook" size={25} color="#fff" /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
