import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { db } from '../firebase/config';

export default function NovaPesquisa() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState(false);


  const pesquisaRef = collection(db, 'pesquisas');

  const redirectHome = async () => {
    if (!nome || !data) {
      setError(true);
      return;
    }

    try {
      
      await addDoc(pesquisaRef, {
        nome: nome,
        data: data,
        // adicionar URL de imagem 
      });
      Alert.alert('Sucesso', 'Pesquisa cadastrada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home' as never) },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a pesquisa.');
    }
  };

  return (
    <ScrollView style={estilos.margem}>
      <View style={estilos.containerExterno}>
        <View>
          <View style={estilos.container}>
            <Text style={estilos.text}>Nome</Text>
            <TextInput
              style={estilos.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
            />
            {error && nome === '' && (
              <Text style={{ color: 'red', fontFamily: 'AveriaLibre-Regular' }}>
                Preencha o nome da pesquisa
              </Text>
            )}
          </View>

          <View style={estilos.container}>
            <Text style={estilos.text}>Data</Text>
            <View style={estilos.containerData}>
              <TextInput
                style={estilos.inputData}
                value={data}
                onChangeText={setData}
                placeholder="Data"
              />
              <Icon name="calendar-month" size={28} color="gray" />
            </View>
            {error && data === '' && (
              <Text style={{ color: 'red', fontFamily: 'AveriaLibre-Regular' }}>
                Preencha a data
              </Text>
            )}
          </View>

          <View style={estilos.container}>
            <Text style={estilos.text}>Imagem</Text>
            <View style={estilos.containerCamera}>
              <Text style={estilos.camera}>Câmera/Galeria de imagens</Text>
            </View>
          </View>
          <View style={estilos.containerCadastrar}>
            <Button title="CADASTRAR" onPress={redirectHome} color="#37BD6D" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  containerExterno: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  margem: {
    backgroundColor: '#372775',
  },
  input: {
    backgroundColor: 'white',
    width: 653,
    alignItems: 'center',
    justifyContent: 'center',
    height: 51,
    fontFamily: 'AveriaLibre-Regular',
  },
  inputData: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'AveriaLibre-Regular',
    height: 51,
    width: 598,
  },
  text: {
    color: 'white',
    fontFamily: 'AveriaLibre-Bold',
  },
  containerData: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 51,
    width: 653,
  },
  container: {
    marginTop: 13,
    marginBottom: 8,
  },
  containerCamera: {
    backgroundColor: 'white',
    height: 94,
    width: 335,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Bold',
  },
  containerCadastrar: {
    marginTop: 40,
  },
});
