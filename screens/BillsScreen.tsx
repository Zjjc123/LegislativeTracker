import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import BillListView from '../components/bill_list/BillListView';

export default function BillsScreen() {
  return (
    <View style={styles.container}>
      <BillListView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
