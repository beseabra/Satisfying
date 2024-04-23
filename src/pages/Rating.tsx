import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RatingScreen() {
  const [rating, setRating] = useState(null);

  const handleRating = (value: any) => {
    setRating(value);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: '#372775'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.sectionTitle}>Satisfying.you</Text>
          </View>
          <View style={styles.containerMargin}>
            <Text style={styles.text}>O que achou do Carnaval 2024?</Text>
            <View style={styles.ratingContainer}>
              <TouchableOpacity
                style={[
                  styles.ratingButton,
                  rating === 1 && styles.selectedRating,
                ]}
                onPress={() => handleRating(1)}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.ratingImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ratingButton,
                  rating === 2 && styles.selectedRating,
                ]}
                onPress={() => handleRating(2)}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.ratingImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ratingButton,
                  rating === 3 && styles.selectedRating,
                ]}
                onPress={() => handleRating(3)}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.ratingImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ratingButton,
                  rating === 4 && styles.selectedRating,
                ]}
                onPress={() => handleRating(1)}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.ratingImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ratingButton,
                  rating === 5 && styles.selectedRating,
                ]}
                onPress={() => handleRating(1)}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.ratingImage}
                />
              </TouchableOpacity>
            </View>
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
