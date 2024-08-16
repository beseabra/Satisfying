import { RouteProp, useRoute } from '@react-navigation/native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../firebase/config'; // Certifique-se de importar o Firestore

const listImages = [
  { value: 1, source: require('../assets/rate1.png') },
  { value: 2, source: require('../assets/rate2.png') },
  { value: 3, source: require('../assets/rate3.png') },
  { value: 4, source: require('../assets/rate4.png') },
  { value: 5, source: require('../assets/rate5.png') },
];

type SearchActionRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

export default function RatingScreen() {
  const [rating, setRating] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute<SearchActionRouteProp>();
  const { id } = route.params;

  const userId = 'user-id'; // Substitua pelo ID do usuário autenticado

  useEffect(() => {
    checkIfUserHasRated();
  }, []);

  const checkIfUserHasRated = async () => {
    const ratingDocRef = doc(db, 'pesquisas', id, 'avaliacoes', userId);
    const ratingDoc = await getDoc(ratingDocRef);

    if (ratingDoc.exists()) {
      Alert.alert('Aviso', 'Você já avaliou essa pesquisa.');
      setRating(ratingDoc.data().rating);
    }
  };

  const handleRating = async (value: number) => {
    if (rating !== null) {
      Alert.alert('Aviso', 'Você já avaliou essa pesquisa.');
      return;
    }

    setRating(value);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);

    const ratingDocRef = doc(db, 'pesquisas', id, 'avaliacoes', userId);

    try {
      await setDoc(ratingDocRef, {
        rating: value,
        userId: userId,
      });
      Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar sua avaliação.');
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: '#372775' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.sectionTitle}>Satisfying.you</Text>
          </View>
          <View style={styles.containerMargin}>
            <Text style={styles.text}>O que achou do Carnaval 2024?</Text>
            <View style={styles.ratingContainer}>
              {listImages.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.ratingButton,
                    rating === value.value && styles.selectedRating,
                  ]}
                  onPress={() => handleRating(value.value)}>
                  <Image source={value.source} style={styles.ratingImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Obrigado por participar da pesquisa!
                </Text>
                <Text style={styles.modalText}>
                  Aguardamos você no próximo ano!
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'AveriaLibre-Bold',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
    color: 'white',
    textAlign: 'center',
  },
  containerMargin: {
    marginTop: 20,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    borderRadius: 30,
    padding: 0,
    width: '15%',
    alignItems: 'center',
  },
  selectedRating: {
    backgroundColor: '#9575cd',
  },
  ratingImage: {
    width: 60,
    height: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#372775',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'AveriaLibre-Bold',
  },
});
