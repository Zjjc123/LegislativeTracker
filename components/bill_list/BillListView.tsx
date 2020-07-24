import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements'
import BillCard from './BillCard'
import DropDownPicker from 'react-native-dropdown-picker';

var url = 'https://api.propublica.org/congress/v1/116/house/bills/active.json'
var apiKey = "DvH6rYhOGmII5UmALNyzXGnRS92InKR3ymkTsP9C"

export default function BillListView() {
  const [bills, setBills] = useState()
  const [initialBills, setInitialBills] = useState()
  const [searchValue, setSearchValue] = useState()
  const [categoryValue, setCategoryValue] = useState()
  const [tagMap, setTagMap] = useState()

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
    var tM: { [id: string]: Array<Object> } = {}

    setBills(response);
    setInitialBills(response);

    response.forEach(item => {

      console.log(item.committees)
      if (tM[item.committees] == null) {
        tM[item.committees] = new Array<Object>()
      }
      tM[item.committees].push(item);
    });

    setTagMap(tM)
  }

  const renderItem = ({ item }) => (
    <BillCard
      title={item.short_title}
      bill_id={item.number}
      intro_date={item.introduced_date}
      summary={item.summary}
      committee={item.committees}
      sponsor={item.sponsor_title + " " + item.sponsor_name + ", " + item.sponsor_state + ", " + item.sponsor_party}
      party={item.sponsor_party}
      house_passage={item.house_passage}
      senate_passage={item.senate_passage}
      enacted={item.enacted}
      vetoed={item.vetoed}
      active={item.active}
    />
  );
  const filterBills = (category, search) => {
    var cat
    var sea

    if (category != null) {
      sea = searchValue
      cat = category.label  
      setCategoryValue(category.label)
    }
    if (search != null) {
      cat = categoryValue
      sea = search
      setSearchValue(search)
    }

    var postTag

    if (cat == "None")
      postTag = initialBills
    else if (tagMap["House " + cat + " Committee"] != null)
      postTag = tagMap["House " + cat + " Committee"]
    else
      postTag = undefined

    if (postTag != undefined) {
      const filteredBills = postTag.filter(
        bill => {
          let billLowerCase = bill.title.toLowerCase()
          let searchTermLowerCase = sea.toLowerCase()

          return billLowerCase.indexOf(searchTermLowerCase) > -1
        }
      )
      setBills(filteredBills)
    } else {
      setBills(postTag)
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchCont}
        inputContainerStyle={styles.search}
        placeholder="Search"
        value={searchValue}
        onChangeText={(value) => filterBills(null, value)}
      />
      <DropDownPicker
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start'
        }} items={[
          { label: 'None', value: '0' },
          { label: 'Agriculture', value: '1' },
          { label: 'Appropriations', value: '2' },
          { label: 'Armed Services', value: '3' },
          { label: 'Budget', value: '4' },
          { label: 'Education and Labor', value: '5' },
          { label: 'Energy and Commerce', value: '6' },
          { label: 'Ethics', value: '7' },
          { label: 'Financial Services', value: '8' },
          { label: 'Foreign Affairs', value: '9' },
          { label: 'Homeland Security', value: '10' },
          { label: 'House Administration', value: '11' },
          { label: 'France', value: '12' },
          { label: 'Judiciary', value: '13' },
          { label: 'Natural Resources', value: '14' },
          { label: 'Oversight and Reform', value: '15' },
          { label: 'Rules', value: '16' },
          { label: 'Science, Space, and Technology', value: '17' },
          { label: 'Small Business', value: '18' },
          { label: "Veteran's Affairs", value: '19' },
          { label: 'Ways and Means', value: '20' },
        ]}
        onChangeItem={(label) => filterBills(label, null)}>

      </DropDownPicker>
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