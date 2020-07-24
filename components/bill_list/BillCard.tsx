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
                com = "Agriculture"
                break
            case "House Appropriations Committee":
                colorHex = "#ff8c00"
                com = "Appropriations"
                break
            case "House Armed Services Committee":
                colorHex = "#F7CB15"
                com = "Armed Services"
                break
            case "House Budget Committee":
                colorHex = "#7cfc00"
                com = "Budget"
                break
            case "House Education and Labor Committee":
                colorHex = "#ba55d3"
                com = "Education and Labor"
                break
            case "House Energy and Commerce Committee":
                colorHex = "#00fa9a"
                com = "Energy and Commerce"
                break
            case "House Ethics Committee":
                colorHex = "#ff00ff"
                com = "Ethics"
                break
            case "House Financial Services Committee":
                colorHex = "#0000ff"
                com = "Financial Services"
                break
            case "House Foreign Affairs Committee":
                colorHex = "#f08080"
                com = "Foreign Affairs"
                break
            case "House Homeland Security Committee":
                colorHex = "#1e90ff"
                com = "Homeland Security"
                break
            case "House Committee on House Administration":
                colorHex = "#d3d3d3"
                com = "House Administration"
                break
            case "House Judiciary Committee":
                colorHex = "#2f4f4f"
                com = "Judiciary"
                break
            case "House Natural Resources Committee":
                colorHex = "#2e8b57"
                com = "Natural Resources"
                break
            case "House Oversight and Reform Committee":
                colorHex = "#7f0000"
                com = "Oversight and Reform"
                break
            case "House Rules Committee":
                colorHex = "#808000"
                com = "Rules"
                break
            case "House Science, Space, and Technology Committee":
                colorHex = "#00008b"
                com = "Science, Space, and Technology"
                break
            case "House Small Business Committee":
                colorHex = "#f0e68c"
                com = "Small Business"
                break
            case "House Transportation and Infrastructure Committee":
                colorHex = "#160F29"
                com = "Transportation and Infrastructure"
                break
            case "House Veteran's Affairs Committee":
                colorHex = "#FE5F55"
                com = "Veteran's Affairs"
                break
            case "House Ways and Means Committee":
                colorHex = "#4F5D2F"
                com = "Ways and Means"
                break
            case "":
                com = "None"
                break
        }

        return (
            <Card containerStyle={{
                backgroundColor: colorHex,
                borderRadius: 10,
                justifyContent: "center",
                flex: 1
            }}>
                <Text style={{
                    color: "#ffffff",
                    textAlign: "center",
                    textAlignVertical: "center",

                }}>{com}</Text>
            </Card>
        )
    }

    const Sponsor = (props) => {
        return (
            <Card containerStyle={{
                backgroundColor: "#000000",
                borderRadius: 10,
                justifyContent: "center",
                flex: 1
            }}>
                <Text style={{
                    color: "#ffffff",
                    textAlign: "center",
                    textAlignVertical: "center",
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
                    <Sponsor name={props.sponsor} />
                    <Committee committee={props.committee} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>

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
