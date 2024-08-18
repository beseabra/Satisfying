import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { ActionSheetIOS, Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { db, storage } from '../firebase/config';
import React = require('react');

export default function NovaPesquisa() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [imagem, setImagem] = useState('');
  const [error, setError] = useState(false);

  const pesquisaRef = collection(db, 'pesquisas');

  const handleSelectImage = () => {
    const options = ['Tirar Foto', 'Escolher da Galeria', 'Cancelar'];
    const cancelButtonIndex = 2;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            openCamera();
          } else if (buttonIndex === 1) {
            openGallery();
          }
        }
      );
    } else {
      // Para Android, você pode implementar uma lógica semelhante com outras bibliotecas ou componentes personalizados.
      // Aqui, estamos utilizando uma abordagem simplificada.
      Alert.alert(
        'Selecionar Imagem',
        'Escolha uma opção:',
        [
          { text: 'Tirar Foto', onPress: openCamera },
          { text: 'Escolher da Galeria', onPress: openGallery },
          { text: 'Cancelar', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri || '';
        setImagem(uri);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
     if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri || '';
        setImagem(uri);
      }
    });
  };

  const redirectHome = async () => {
    if (!nome || !data || !imagem) {
      setError(true);
      return;
    }
  
    try {
      // 1. Criar referência no Storage
      const imageRef = ref(storage, `images/${nome}-${Date.now()}.jpg`);
  
      // 2. Converter imagem para blob
      const response = await fetch(imagem);
      const blob = await response.blob();
  
      // 3. Fazer upload da imagem
      await uploadBytes(imageRef, blob);
  
      // 4. Obter URL de download da imagem
      const downloadURL = await getDownloadURL(imageRef);
  
      // 5. Salvar dados no Firestore com o URL da imagem
      await addDoc(pesquisaRef, {
        nome: nome,
        data: data,
        imagem: downloadURL,
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
            <TouchableOpacity onPress={handleSelectImage} style={estilos.containerCamera}>
              <Text style={estilos.camera}>
                {imagem ? 'Imagem selecionada' : 'Selecionar Imagem'}
              </Text>
            </TouchableOpacity>
            {error && imagem === '' && (
              <Text style={{ color: 'red', fontFamily: 'AveriaLibre-Regular' }}>
                Preencha a imagem
              </Text>
            )}
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
