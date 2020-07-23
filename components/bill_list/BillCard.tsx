import React, { View, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'

export default function BillCard(props) {
    return (
        <View>
            <ListItem
                title={props.title}
                subtitle={props.subtitle}
                bottomDivider
                onPress={() => Alert.alert('Simple Button pressed')} />
        </View>
    )
}