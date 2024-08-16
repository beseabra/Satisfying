import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Button from '../components/Button';
import { useUserContext } from '../contexts/UserContext';
import { auth_mod } from '../firebase/config';

export default function Login() {
  const navigation = useNavigation();
  const { dispatch } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleLogin() {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email) && password !== '') {
      signInWithEmailAndPassword(auth_mod, email, password)
        .then((userCredential) => {
          setError(false);
          const userId = userCredential.user.uid;
          dispatch({ type: 'SET_USER_ID', payload: userId });
          navigation.navigate('Home' as never);
        })
        .catch((error) => {
          setError(true);
          Alert.alert('Erro', 'Email e/ou senha inválidos.');
          console.log(error);
        });
    } else {
      setError(true);
      Alert.alert('Erro', 'Por favor, insira um email e senha válidos.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: '#372775' }} contentContainerStyle={{ flexGrow: 1 }}>
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
              <Text style={{ color: 'red' }}>
                {error && 'Email e/ou senha inválidos'}
              </Text>
            </View>
            <View style={styles.containerMargin}>
              <Button title="Entrar" color="#37BD6D" onPress={handleLogin} />
            </View>
            <View style={{ marginVertical: 20, gap: 10 }}>
              <Button title="Criar conta" onPress={() => navigation.navigate('NewAccount' as never)} />
              <Button title="Esqueci a senha" color="#B0CCDE" onPress={() => navigation.navigate('NewPassword' as never)} />
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
