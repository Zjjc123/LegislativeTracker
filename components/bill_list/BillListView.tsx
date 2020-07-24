import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements'
import BillCard from './BillCard'
var url = 'https://api.propublica.org/congress/v1/116/house/bills/active.json'
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

  const renderItem = ({item}) => (
    <BillCard
      title={item.title}
      bill_id={item.number}
      intro_date={item.introduced_date}
      summary={item.summary}
    />
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
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchCont}
        inputContainerStyle={styles.search}
        placeholder="Search"
        value={searchValue}
        onChangeText={(value) => searchBills(value)}
      />
      <FlatList
        data={bills}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
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
  search: {
    backgroundColor: 'white',
  },
  searchCont: {
    backgroundColor: '#EAE7D8',
    borderBottomWidth: 0,
    borderTopWidth: 0
  }
});