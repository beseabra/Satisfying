import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { db } from '../firebase/config';

type Pesquisa = {
  id: string;
  nome: string;
  data: string;
  imagem: string;
};

export default function Home() {
  const navigation = useNavigation();
  const [pesquisa, setPesquisa] = useState<string>('');
  const [pesquisas, setPesquisas] = useState<Pesquisa[]>([]);

  const fetchPesquisas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pesquisas'));
      const pesquisasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Pesquisa[];
      setPesquisas(pesquisasData);
    } catch (error) {
      console.error('Erro ao buscar as pesquisas:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPesquisas();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={25} color="#000" />
            <TextInput
              style={styles.input}
              onChangeText={setPesquisa}
              value={pesquisa}
              placeholder="Insira o termo de busca..."
            />
          </View>
          <View style={styles.eventContainer}>
            {pesquisas.map(pesquisa => (
              <View key={pesquisa.id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Search Action' as never, { id: pesquisa.id } as never)
                  }>
                  <Image style={styles.image} source={require('../assets/secomp.png')} />
                  <Text>{pesquisa.nome}</Text>
                  <Text>{pesquisa.data}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Button
            title="NOVA PESQUISA"
            color="#37BD6D"
            onPress={() => navigation.navigate('Nova pesquisa' as never)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#372775',
  },
  container: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontFamily: 'AveriaLibre-Bold',
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 58,
  },
  image: {
    width: 230,
    height: 200,
    borderRadius: 10,
  },
  button: {
    fontFamily: 'AveriaLibre-Bold',
  },
});
