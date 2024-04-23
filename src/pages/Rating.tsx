import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

// Adicionando um tipo de módulo para importação de imagens
declare const require: (path: string) => number;

interface RatingScreenProps {}

export default function RatingScreen(props: RatingScreenProps) {
  const [rating, setRating] = useState<number | null>(null);

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: '#372775' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.sectionTitle}>Satisfying.you</Text>
          </View>
          <View style={styles.containerMargin}>
            <Text style={styles.text}>O que achou do Carnaval 2024?</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[styles.ratingButton, rating === value && styles.selectedRating]}
                  onPress={() => handleRating(value)}
                >
                  <Image source={getImageSource(value)} style={styles.ratingImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Função para obter a fonte da imagem com base no valor
function getImageSource(value: number): number {
  switch (value) {
    case 1:
      return require('../assets/rate1.png');
    case 2:
      return require('../assets/rate2.png');
    case 3:
      return require('../assets/rate3.png');
    case 4:
      return require('../assets/rate4.png');
    case 5:
      return require('../assets/rate5.png');
    default:
      throw new Error('Invalid rating value');
  }
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
});
