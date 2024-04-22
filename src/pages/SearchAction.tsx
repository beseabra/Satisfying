import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function NewAccount() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Image source={require('../assets/change.png')} />
          <Text style={styles.buttonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Image source={require('../assets/check.png')} />
          <Text style={styles.buttonText}>Coletar os dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Report')}>
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
  goBackArrow: {color: '#fff', marginRight: 16},

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
