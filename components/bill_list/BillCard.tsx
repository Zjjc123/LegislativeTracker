import React from 'react'
import { View, StyleSheet, Text, ViewPagerAndroid } from 'react-native';
import { Card, colors } from 'react-native-elements'

export default function BillCard(props) {
    const Committee = (props) => {
        var colorHex: string = "#0C222E"
        var com = props.committee
        switch (props.committee) {
            case "House Agriculture Committee":
                colorHex = "#ff0000"
                break
            case "House Appropriations Committee":
                colorHex = "#ff8c00"
                break
            case "House Armed Services Committee":
                colorHex = "#F7CB15"
                break
            case "House Budget Committee":
                colorHex = "#7cfc00"
                break
            case "House Education and Labor Committee":
                colorHex = "#ba55d3"
                break
            case "House Energy and Commerce Committee":
                colorHex = "#00fa9a"
                break
            case "House Ethics Committee":
                colorHex = "#ff00ff"
                break
            case "House Financial Services Committee":
                colorHex = "#0000ff"
                break
            case "House Foreign Affairs Committee":
                colorHex = "#f08080"
                break
            case "House Homeland Security Committee":
                colorHex = "#1e90ff"
                break
            case "House Committee on House Administration":
                colorHex = "#d3d3d3"
                break
            case "House Judiciary Committee":
                colorHex = "#2f4f4f"
                break
            case "House Natural Resources Committee":
                colorHex = "#2e8b57"
                break
            case "House Oversight and Reform Committee":
                colorHex = "#7f0000"
                break
            case "House Rules Committee":
                colorHex = "#808000"
                break
            case "House Science, Space, and Technology Committee":
                colorHex = "#00008b"
                break
            case "House Small Business Committee":
                colorHex = "#f0e68c"
                break
            case "House Transportation and Infrastructure Committee":
                colorHex = "#160F29"
                break
            case "House Veteran's Affairs Committee":
                colorHex = "#FE5F55"
                break
            case "House Ways and Means Committee":
                colorHex = "#4F5D2F"
                break
            case "":
                com = "None"
                break
        }

        return (
            <Card containerStyle={{
                backgroundColor: colorHex,
                borderRadius: 10,
                flex: 1
            }}>
                <Text style={{
                    color: "#ffffff",
                    textAlign: "center"
                }}>{com}</Text>
            </Card>
        )
    }

    const Sponsor = (props) => {
        return (
            <Card containerStyle={{
                backgroundColor: "#000000",
                borderRadius: 10,
                flex: 1
            }}>
                <Text style={{
                    color: "#ffffff",
                    textAlign: "center"
                }}>{props.name}</Text>
            </Card>
        )
    }

    return (
        <View>
            <Card containerStyle={styles.card}>
                <Text>
                    <Text style={{ fontWeight: "bold" }}>{props.bill_id}</Text>
                    <Text>{" introduced: "}</Text>
                    <Text>{props.intro_date}</Text>
                </Text>
                <Text style={styles.titleText}>{props.title}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Sponsor name={props.sponsor}/>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Committee committee={props.committee}/>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        flex: 1,
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold"
    },
});
