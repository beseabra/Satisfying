import { useRoute } from '@react-navigation/native';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, processColor } from 'react-native';
import { PieChart } from 'react-native-charts-wrapper';
import { db } from '../firebase/config';
import { SearchActionRouteProp } from './Rating';

type RatingCategory = 'Excelente' | 'Bom' | 'Neutro' | 'Ruim' | 'Péssimo';

const categories: RatingCategory[] = ['Excelente', 'Bom', 'Neutro', 'Ruim', 'Péssimo'];
const colors = ['#C0FF8C', '#FFF78C', '#FFD08C', '#8CEAFF', '#FF8C9D'];

export default function MyComponent() {
  const route = useRoute<SearchActionRouteProp>();
  const { id } = route.params;

  const [chartData, setChartData] = useState({
    dataSets: [
      {
        values: categories.map((_, index) => ({ value: 0, label: categories[index] })),
        label: '',
        config: {
          colors: colors.map(color => processColor(color)),
          valueTextSize: 20,
          valueTextColor: processColor('black'),
          sliceSpace: 5,
          selectionShift: 13,
          valueFormatter: "#.#'%'",
          valueLinePart1Length: 0.5,
        },
      },
    ],
  });

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsRef = collection(db, 'pesquisas', id, 'avaliacoes');
        const q = query(ratingsRef);
        const querySnapshot = await getDocs(q);

        const count: Record<RatingCategory, number> = {
          Excelente: 0,
          Bom: 0,
          Neutro: 0,
          Ruim: 0,
          Péssimo: 0,
        };

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          switch (data.rating) {
            case 1:
              count['Péssimo'] += 1;
              break;
            case 2:
              count['Ruim'] += 1;
              break;
            case 3:
              count['Neutro'] += 1;
              break;
            case 4:
              count['Bom'] += 1;
              break;
            case 5:
              count['Excelente'] += 1;
              break;
          }
        });

        const totalRatings = Object.values(count).reduce((acc, curr) => acc + curr, 0);
        const dataSets = [{
          values: categories.map((category) => ({
            value: (count[category] / totalRatings) * 100,
            label: category,
          })),
          label: '',
          config: {
            colors: colors.map(color => processColor(color)),
            valueTextSize: 20,
            valueTextColor: processColor('black'),
            sliceSpace: 5,
            selectionShift: 13,
            valueFormatter: "#.#'%'",
            valueLinePart1Length: 0.5,
          },
        }];

        setChartData({ dataSets });
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchRatings();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#372775'}}>
        <PieChart
          style={styles.chart}
          data={chartData}
          rotationEnabled={true}
          usePercentValues={true}
          holeRadius={0}
          transparentCircleRadius={0}
          maxAngle={360}
          entryLabelColor={processColor('green')}
          entryLabelTextSize={0}
        />
        <View style={{justifyContent: 'center'}}>
          {categories.map((category, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: colors[index],
                  marginRight: 5,
                }}
              />
              <Text style={styles.text}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
  },
  chart: {
    flex: 1,
    maxWidth: '60%',
  },
  text: {
    color: 'white',
    fontFamily: 'AveriaLibre-Regular',
  },
});
