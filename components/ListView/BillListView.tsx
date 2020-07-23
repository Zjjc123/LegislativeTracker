import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

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

  const renderRow = ({item}) => {
    return (
      <ListItem>
        <Text style={{color: 'red'}}>{item.title}</Text>
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList
        data = {bills}
        renderItem = {renderRow}
      />
    </View>
  )
}


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