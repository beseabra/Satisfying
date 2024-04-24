import {useNavigation} from '@react-navigation/native';
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function ModificarPesquisa() {

  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  
  const redirectHome = () => {
    navigation.navigate('');
  }

  const redirectPopUp = () => {
    navigation.navigate('');
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
          </View>

          <View style={estilos.container}>
            <Text style={estilos.text}>Imagem</Text>
            <View style={estilos.containerCamera}>
              <Icon name="celebration" size={50} color="#C60EB3"/>
            </View>
          </View>

          <View style={estilos.containerFooter}>
            <TouchableOpacity style={estilos.btn} onPress={redirectHome}>
              <Text style={estilos.btnSalvar}>SALVAR</Text>
            </TouchableOpacity>
            <View style={estilos.btnApagar}>
              <TouchableOpacity onPress={redirectPopUp}>
                <Icon name="delete-outline" size={40} color="white"/>
                <Text style={estilos.text}>Apagar</Text>
              </TouchableOpacity>

            </View>
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
      textAlign: 'center'
    },
    containerFooter: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
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
    btnApagar: {
      marginLeft: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15
    },
    btnSalvar: {
      color: 'white',
      fontFamily: 'AveriaLibre-Regular'
    }
});
