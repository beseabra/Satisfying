
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from '../components/Button';
import { auth_mod } from '../firebase/config';
import React = require('react');

export default function NewPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  function handlePassword(email: string) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = re.test(String(email).toLowerCase());
    setError(!isValidEmail);

    if (isValidEmail) {
      sendPasswordResetEmail(auth_mod, email)
        .then(() => {
          Alert.alert(
            'Sucesso',
            'Um link para redefinir sua senha foi enviado para o e-mail fornecido.',
          );
        })
        .catch((error) => {
          Alert.alert('Erro', 'Ocorreu um erro ao tentar redefinir a senha.');
        });
    } else {
      setError(true);
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {error && (
              <Text style={{ color: 'red' }}>E-mail parece ser inválido</Text>
            )}
          </View>

          <Button
            title="Recuperar"
            onPress={() => handlePassword(email)}
            color={'#37BD6D'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#372775',
    padding: 20,
  },
  textInput: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'AveriaLibre-Regular',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    fontFamily: 'AveriaLibre-Regular',
  },
  containerInput: {
    marginBottom: 40,
    marginTop: 40,
  },
});
