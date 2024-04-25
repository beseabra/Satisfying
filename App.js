import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationOptions } from './navigationOptions';
import Login from './src/pages/Login';
import ModificarPesquisa from './src/pages/ModificarPesquisa';
import NewAccount from './src/pages/NewAccount';
import NewPassword from './src/pages/NewPassword';
import NovaPesquisa from './src/pages/NovaPesquisa';
import Rating from './src/pages/Rating';
import Report from './src/pages/Report';
import SearchAction from './src/pages/SearchAction';
import Home from './src/pages/Home';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
          }}
          screenOptions={navigationOptions}
        />
    
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{
            title: 'Recuperação de Senha',
          }}
        />
        <Stack.Screen
          name="NewAccount"
          component={NewAccount}
          options={{
            title: 'Nova Conta',
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
          name="Search Action"
          component={SearchAction}
          options={{
            title: 'Carnaval',
          }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            title: 'Report',
          }}
        />
        <Stack.Screen
          name="Nova pesquisa"
          component={NovaPesquisa}
          options={{
            title: 'Nova pesquisa',
          }}
        />
        <Stack.Screen
          name="Modificar pesquisa"
          component={ModificarPesquisa}
          options={{
            title: 'Modificar pesquisa',
          }}
        />
        <Stack.Screen
          name="Rating"
          component={Rating}
          options={{
            title: 'Rating',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
