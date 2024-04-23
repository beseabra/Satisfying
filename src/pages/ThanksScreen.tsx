import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ThanksScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: '#372775' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.sectionTitle}>Satisfying.you</Text>
            <Image source={require('../assets/logo.png')} />
          </View>
          <View style={styles.containerMargin}>
            <Text style={styles.text}>Obrigado por participar da pesquisa!</Text>
            <Text style={styles.text}>Aguardamos você na próxima!</Text>
          </View>
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
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
});
