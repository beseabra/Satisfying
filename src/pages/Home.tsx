import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  View,
  useColorScheme,
  Image,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Home() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [pesquisa, setPesquisa] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: '#372775' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Icon name="search" size={25} color="black" />
            <TextInput
              style={styles.input}
              onChangeText={setPesquisa}
              value={pesquisa}
              placeholder="Insira o termo de busca..."
            />
          </View>
          <View>
            <Image style={styles.imagem} source={{ uri: 'https://i.imgur.com/39Bf57i.png' }} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="NOVA PESQUISA"
              color="#37BD6D"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.white,
    textAlign: 'center',
  },
  imagem: {
    height: '50%',
    width: '60%',
    marginTop: 15,
  },
  containerMargin: {
    marginTop: -150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
});
