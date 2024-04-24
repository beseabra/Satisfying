import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../components/Button';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setLogin] = useState(false);
  const [error, setError] = useState(false);

  function handleLogin() {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email) && password !== '') {
      setLogin(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: '#372775'}}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.containerHeader}>
              <Text style={styles.sectionTitle}>Satisfying.you</Text>
              <Image source={require('../assets/logo.png')} />
            </View>
            <View style={styles.containerMargin}>
              <Text style={styles.textInput}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
              />
              <Text style={styles.textInput}>Senha</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Senha"
                secureTextEntry={true}
              />
              <Text style={{color: 'red'}}>
                {error && 'Email e/ou senha inválidos'}
              </Text>
            </View>
            <View style={styles.containerMargin}>
              <Button
                title="Entrar"
                color="#37BD6D"
                onPress={() => {
                  handleLogin();
                }}
              />
            </View>
            <View style={{marginVertical: 20, gap: 10}}>
              <Button
                title="Criar conta"
                onPress={() => {
                  navigation.navigate('NewAccount' as never);
                }}
              />
              <Button
                title="Esqueci a senha"
                color="#B0CCDE"
                onPress={() => {
                  navigation.navigate('NewPassword' as never);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    fontFamily: 'AveriaLibre-Regular',
  },
  textInput: {
    color: Colors.lighter,
    fontFamily: 'AveriaLibre-Bold',
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Bold',
  },
  containerMargin: {
    marginTop: 20,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
