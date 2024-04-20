import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function NewAccount() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({password: '', confirmPassword: ''});
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);

  function handleCreateAccount() {
    if (password.password === password.confirmPassword) {
      setLogin(true);
      setError(false);
      navigation.navigate('Login');
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
  },
  textInput: {
    color: Colors.lighter,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.white,
    textAlign: 'center',
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
