import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';

export default function ModificarPesquisa() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [calcell, setCalcell] = useState(false);
  const [camposPreenchidos, setCamposPreenchidos] = useState(false);

  const redirectPopUp = () => {
    setCalcell(true);
  };

  const handleDelete = () => {
    setCalcell(false);
    navigation.navigate('Home' as never)
  };

  const handleSave = () => {
    if (nome !== '' && data !== '') {
      navigation.navigate('Home' as never);
    } else {
      alert('Por favor, preencha todos os campos antes de salvar.');
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
            <View style={estilos.containerCamera}>
              <Icon name="celebration" size={50} color="#C60EB3" />
            </View>
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
    fontFamily: 'AveriaLibre-Bold'
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
    fontFamily: 'AveriaLibre-Regular'

  },
  inputData: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 51,
    width: 598,
    fontFamily: 'AveriaLibre-Regular'

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
    justifyContent: 'center'
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
