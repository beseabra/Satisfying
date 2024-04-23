import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/Login';
import NewPassword from './src/pages/NewPassword';
import NewAccount from './src/pages/NewAccount';
import React from 'react';
import Report from './src/pages/Report';
import SearchAction from './src/pages/SearchAction';
import Rating from './src/pages/Rating';
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
