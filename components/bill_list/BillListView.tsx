import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, StatusBar, StyleSheet, Button, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
var url = 'https://api.propublica.org/congress/v1/115/house/bills/introduced.json'
var apiKey = "DvH6rYhOGmII5UmALNyzXGnRS92InKR3ymkTsP9CDvH6rYhOGmII5UmALNyzXGnRS92InKR3ymkTsP9C"

export default function BillListView() {
  const [bills, setBills] = useState()

  // Empty dependency array in use effect (runs once)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json =>
        // Triggers rerender
        setBills(json)
      )
    console.log(bills)
  }, [])

  const Item = ({ title }) => (
    <View>
      <ListItem style = {styles.listItem}
        title = {title}
        onPress={() => Alert.alert('Simple Button pressed')}/>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bills}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  listItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});

async function getBills(url: string, apiKey: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key": apiKey
      }
    });
    const responseJson = await response.json();
    console.log(responseJson)
    return responseJson.result;
  }
  catch (error) {
    console.error(error);
  }
}