import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ItemOT = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <View>
          <Text style={styles.number}>#2</Text>
          <Text style={styles.title}>titulo</Text>
          <Text style={styles.info}>Sarmiento 123</Text>
          <Text style={styles.info}>15 agosto 2021</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text>Estado</Text>
          <Text>Ver detalle</Text>
        </View>
      </View>
    </View>
  );
};

function formatDate(date: string) {
  return date.split('T', 1);
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 8,
    marginVertical: 10,
    elevation: 6,
  },
  number: {
    fontSize: 23,
    color: 'grey',
    marginBottom: 3,
  },
  title: {
    marginTop: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 19,
  },
  info: {
    marginTop: 1,
    color: 'grey',
    fontWeight: '600',
    fontSize: 15,
  },
});
