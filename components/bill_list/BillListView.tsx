import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, StatusBar, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements'
var url = 'https://api.propublica.org/congress/v1/116/house/bills/introduced.json'
var apiKey = "DvH6rYhOGmII5UmALNyzXGnRS92InKR3ymkTsP9C"

export default function BillListView() {
  const [bills, setBills] = useState()
  const [initialBills, setInitialBills] = useState()
  const [searchValue, setSearchValue] = useState()

  // Empty dependency array in use effect (runs once)
  useEffect(() => {
    fetch(url, {
      headers: {
        "X-API-Key": apiKey
      }
    })
      .then(response => response.json())
      .then(response =>
        // Triggers rerender
        initializeBill(response.results[0].bills)
      )
  }, [])

  const initializeBill = (response) => {
    setBills(response);
    setInitialBills(response);
  }

  const Item = ({ title, bill_id }) => (
    <View>
      <ListItem
        title={title}
        subtitle={bill_id}
        bottomDivider
        onPress={() => Alert.alert('Simple Button pressed')}/>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} bill_id={item.userId} />
  );

  const searchBills = (search) => {
    const filteredBills = initialBills.filter(
      bill => {
        let billLowerCase = bill.title.toLowerCase()
        let searchTermLowerCase = search.toLowerCase()

        return billLowerCase.indexOf(searchTermLowerCase) > -1
      }
    )
    setBills(filteredBills)
    setSearchValue(search)
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder = "Search"
        value = {searchValue}
        onChangeText = {(value) => searchBills(value)}
      />
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
    width: Dimensions.get('screen').width
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});