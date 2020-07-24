import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements'

export default function BillCard(props) {
    return (
        <View>
            <Card containerStyle={styles.card}>
                <Text>
                    <Text style={{fontWeight: "bold"}}>{props.bill_id}</Text>
                    <Text>{" introduced: "}</Text>
                    <Text>{props.intro_date}</Text>
                </Text>
                <Text style={styles.titleText}>{props.title}</Text>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold"
    },
});
