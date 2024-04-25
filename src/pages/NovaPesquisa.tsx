import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';


export default function NovaPesquisa() {

  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

  const redirectHome = () => {
    if (!nome || !data) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    } else {
      navigation.navigate('Home');
    }
  }

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
            {nome === '' && <Text style={{ color: 'red', fontFamily: 'AveriaLibre-Regular' }}>Preencha no nome da pesquisa</Text>}
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
            {data === '' && <Text style={{ color: 'red', fontFamily: 'AveriaLibre-Regular' }}>Preencha a data</Text>}
          </View>

          <View style={estilos.container}>
            <Text style={estilos.text}>Imagem</Text>
            <View style={estilos.containerCamera}>
              <Text style={estilos.camera}>
                Câmera/Galeria de imagens
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity style={estilos.btn} onPress={redirectHome}>
              <Text style={estilos.btnCadastrar}>CADASTRAR</Text>
            </TouchableOpacity>
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
    padding: 20
  },
  margem: {
    backgroundColor: "#372775"
  },
  input: {
    backgroundColor: 'white',
    width: 653,
    alignItems: 'center',
    justifyContent: 'center',
    height: 51
  },
  inputData: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 51,
    width: 598
  },
  text: {
    color: 'white',
    fontFamily: 'AveriaLibre-Regular'
  },
  containerData: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 51,
    width: 653
  },
  container: {
    marginTop: 13
  },
  containerCamera: {
    backgroundColor: 'white',
    height: 94,
    width: 335,
    alignItems: 'center',
    justifyContent: 'center'
  },
  camera: {
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular'
  },
  btn: {
    width: 653,
    backgroundColor: "#37BD6D",
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 46,
    marginBottom: 30
  },
  btnCadastrar: {
    color: 'white',
    fontFamily: 'AveriaLibre-Regular'
  }
});