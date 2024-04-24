import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Image,
  Button,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const eventData = [
  { key: '1', image: require('../assets/secomp.png') },
  { key: '2', image: require('../assets/ubuntu.png') },
  { key: '3', image: require('../assets/meninas_cpu.png') }
];

export default function Home() {
  const navigation = useNavigation();
  const [pesquisa, setPesquisa] = useState('');

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
            {eventData.map((event) => (
              <View key={event.key} style={styles.eventItem}>
                <Image style={styles.image} source={event.image} />
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
            ))}
          </View>
          <Button
            title="NOVA PESQUISA"
            color="#37BD6D"
            onPress={() => navigation.navigate('Home')}
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
  },
  eventContainer: {
    flexDirection: 'row', // Layout horizontal
    justifyContent: 'space-around', // Espaçamento igual entre os itens
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
});
