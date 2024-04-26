import React from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';

export default function MyComponent() {
  const categories = ['Excelente', 'Bom', 'Neutro', 'Ruim', 'Péssimo'];
  const colors = ['#C0FF8C', '#FFF78C', '#FFD08C', '#8CEAFF', '#FF8C9D'];

  const chartData = {
    dataSets: [
      {
        values: categories.map((category, index) => ({
          value: index + 1,
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
      },
    ],
  };

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
