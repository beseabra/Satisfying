import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import React = require('react');

const eventData = [
  {key: '1', image: require('../assets/secomp.png')},
  {key: '2', image: require('../assets/ubuntu.png')},
  {key: '3', image: require('../assets/meninas_cpu.png')},
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
            {eventData.map(event => (
              <View key={event.key}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Search Action' as never)}>
                  <Image style={styles.image} source={event.image} />
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
