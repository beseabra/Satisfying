import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { db, storage } from '../firebase/config';
import React = require('react');

type ModificarPesquisaRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

export default function ModificarPesquisa() {
  const navigation = useNavigation();
  const route = useRoute<ModificarPesquisaRouteProp>();
  const { id } = route.params;

  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [imagem, setImagem] = useState('');
  const [imagemAnterior, setImagemAnterior] = useState('');
  const [calcell, setCalcell] = useState(false);

  useEffect(() => {
    const fetchPesquisa = async () => {
      const pesquisaRef = doc(db, 'pesquisas', id);
      const pesquisaSnap = await getDoc(pesquisaRef);

      if (pesquisaSnap.exists()) {
        const pesquisaData = pesquisaSnap.data();
        setNome(pesquisaData.nome);
        setData(pesquisaData.data);
        setImagemAnterior(pesquisaData.imagem); // URL da imagem atual
      } else {
        Alert.alert('Erro', 'Pesquisa não encontrada.');
        navigation.navigate('Home' as never);
      }
    };

    fetchPesquisa();
  }, [id]);

  const handleSelectImage = () => {
    const options = ['Tirar Foto', 'Escolher da Galeria', 'Cancelar'];
    const cancelButtonIndex = 2;

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
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const uri = response.assets?.[0]?.uri || '';
        setImagem(uri);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.errorCode) {
        const uri = response.assets?.[0]?.uri || '';
        setImagem(uri);
      }
    });
  };

  const handleSave = async () => {
    if (nome !== '' && data !== '') {
      try {
        const pesquisaRef = doc(db, 'pesquisas', id);
        let imageUrl = imagemAnterior;

        if (imagem && imagem !== imagemAnterior) {
          // Substituir a imagem no Firebase Storage
          const imageRef = ref(storage, `images/${id}`);
          const response = await fetch(imagem);
          const blob = await response.blob();

          await uploadBytes(imageRef, blob);
          imageUrl = await getDownloadURL(imageRef);

          // Excluindo a imagem anterior, se houver
          if (imagemAnterior) {
            const oldImageRef = ref(storage, imagemAnterior);
            await deleteObject(oldImageRef);
          }
        }

        await updateDoc(pesquisaRef, {
          nome,
          data,
          imagem: imageUrl,
        });
        Alert.alert('Sucesso', 'Pesquisa atualizada com sucesso!');
        navigation.navigate('Home' as never);
      } catch (error) {
        console.log(error);
        
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar a pesquisa.');
      }
    } else {
      Alert.alert('Por favor, preencha todos os campos antes de salvar.');
    }
  };

  const redirectPopUp = () => {
    setCalcell(true);
  };

  const handleDelete = async () => {
    try {
      const pesquisaRef = doc(db, 'pesquisas', id);
      await deleteDoc(pesquisaRef);

      // Deletar a imagem associada do Storage
      if (imagemAnterior) {
        const imageRef = ref(storage, imagemAnterior);
        await deleteObject(imageRef);
      }

      Alert.alert('Sucesso', 'Pesquisa apagada com sucesso!');
      setCalcell(false);
      navigation.navigate('Home' as never);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao apagar a pesquisa.');
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
          </View>

          <View style={estilos.container}>
            <Text style={estilos.text}>Data</Text>
            <View style={estilos.containerData}>
              <TextInput
                style={estilos.inputData}
                value={data}
                onChangeText={setData}
                placeholder="DD/MM/AAAA"
                maxLength={10}
              />
              <View style={estilos.calendar}>
                <Icon name="calendar-month" size={28} color="gray" />
              </View>
            </View>
          </View>

          <View style={estilos.container}>
            <Text style={estilos.text}>Imagem</Text>
            <TouchableOpacity onPress={handleSelectImage} style={estilos.containerCamera}>
              {imagem ? (
                <Image source={{ uri: imagem }} style={{ width: 100, height: 100 }} />
              ) : (
                <Icon name="photo" size={50} color="#C60EB3" />
              )}
            </TouchableOpacity>
          </View>

          <View style={estilos.containerFooter}>
            <TouchableOpacity style={estilos.btn} onPress={handleSave}>
              <Text style={estilos.btnSalvar}>SALVAR</Text>
            </TouchableOpacity>
            <View style={estilos.btnApagar}>
              <TouchableOpacity onPress={redirectPopUp}>
                <Icon name="delete-outline" size={40} color="white" />
                <Text style={estilos.text}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={calcell}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCalcell(false)}>
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Text style={estilos.modalText}>
              Tem certeza que deseja apagar essa pesquisa?
            </Text>

            <View style={estilos.modalButton}>
              <Button title="SIM" onPress={handleDelete} color="#FF8383" />

              <Button
                title="CANCELAR"
                onPress={() => setCalcell(false)}
                color="#3F92C5"
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}


const estilos = StyleSheet.create({
  btnSalvar: {
    color: 'white',
    fontFamily: 'AveriaLibre-Bold',
  },
  btn: {
    width: 653,
    backgroundColor: '#37BD6D',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 46,
    marginBottom: 30,
  },
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
    height: 51,
    width: 598,
    fontFamily: 'AveriaLibre-Regular',
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
    width: 55,
  },
  calendar: {
    backgroundColor: 'white',
    width: 55,
    height: 51,
    justifyContent: 'center',
  },
  container: {
    marginTop: 13,
  },
  containerCamera: {
    backgroundColor: 'white',
    height: 94,
    width: 335,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnApagar: {
    marginLeft: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2B1F5C',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    color: 'white',
  },
  modalButton: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
  },
});
