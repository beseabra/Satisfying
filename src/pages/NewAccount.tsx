import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function NewAccount() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({password: '', confirmPassword: ''});
  const [, setLogin] = useState(false);
  const [error, setError] = useState(false);

  function handleCreateAccount() {
    if (password.password === password.confirmPassword) {
      setLogin(true);
      setError(false);
      navigation.navigate('Login' as never);
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
                onChangeText={text =>
                  setPassword({
                    ...password,
                    password: text,
                  })
                }
                value={password.password}
                placeholder="Senha"
                secureTextEntry={true}
              />
              <Text style={styles.textInput}>Repita a senha</Text>
              <TextInput
                style={styles.input}
                onChangeText={text =>
                  setPassword({
                    ...password,
                    confirmPassword: text,
                  })
                }
                value={password.confirmPassword}
                placeholder="Repetir senha"
                secureTextEntry={true}
              />
              <Text style={{color: 'red'}}>
                {error && 'O campo repetir senha difere da senha'}
              </Text>
            </View>
            <View style={styles.containerMargin}>
              <Button
                title="Cadastrar"
                color="#37BD6D"
                onPress={handleCreateAccount}
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
    fontFamily: 'AveriaLibre-Regular',
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
