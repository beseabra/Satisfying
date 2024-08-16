import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SearchActionRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

export default function SearchAction() {
  const navigation = useNavigation();
  const route = useRoute<SearchActionRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Modificar pesquisa' as never, { id } as never)}>
          <Image source={require('../assets/change.png')} />
          <Text style={styles.buttonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rating' as never,{ id } as never)}>
          <Image source={require('../assets/check.png')} />
          <Text style={styles.buttonText}>Coletar os dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Report' as never)}>
          <Image source={require('../assets/report.png')} />
          <Text style={styles.buttonText}>Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#382775',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 36,
    height: 180,
    width: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#302464',
    borderRadius: 8,
    marginBottom: 24,
    marginRight: 24,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 24,
    color: '#fff',
  },
});
