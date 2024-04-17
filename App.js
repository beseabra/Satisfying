import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login';
import NewAccount from './src/pages/NewAccount';
import NewPassword from './src/pages/NewPassword';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  >
      <Stack.Screen name=" Login " component={Login}/>
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="NewAccount" component={NewAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
