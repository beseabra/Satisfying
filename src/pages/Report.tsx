import {useNavigation} from '@react-navigation/native';
import {Dimensions, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import React = require('react');

const data = [
  {
    name: 'Excelente',
    value: 25,
    color: 'yellow',
    legendFontColor: '#fff',
    legendFontSize: 15,
  },
  {
    name: 'Bom',
    value: 25,
    color: 'lightblue',
    legendFontColor: '#fff',
    legendFontSize: 15,
  },
  {
    name: 'Neutro',
    value: 10,
    color: 'lightgreen',
    legendFontColor: '#fff',
    legendFontSize: 15,
  },
  {
    name: 'Ruim',
    value: 20,
    color: 'red',
    legendFontColor: '#fff',
    legendFontSize: 15,
  },
  {
    name: 'Péssimo',
    value: 20,
    color: 'blue',
    legendFontColor: '#fff',
    legendFontSize: 15,
  },
];

export default function Report() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#382775'}}>
      <PieChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}
