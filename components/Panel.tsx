import React from 'react';
import {StyleSheet, Text, View, Platform, Animated, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import * as OS from "os";

interface stateType{
    title: string,
    expanded: boolean,
    maxHeight: number,
    minHeight: number,
    animation: Animated.Value
}

export default class Panel extends React.Component<{}, stateType> {
    private readonly icons: { up: any; down: any };
    constructor(props: any){
        super(props);

        this.icons = {
            'up'    : <Icon
                        name='arrow-drop-up'
                        type='material'/>,
            'down'  : <Icon
                        name='arrow-drop-down'
                        type='material'/>
        };

        this.state = {
            title: props.title,
            expanded: false,
            maxHeight: 0,
            minHeight: 0,
            animation: new Animated.Value(25),
        };
    }

    toggle(){
        let finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        Animated.timing(
            this.state.animation,
            {
                toValue: finalValue,
                useNativeDriver: false,
                duration: 300
            }
        ).start();
    }

    _setMaxHeight(event: any){
        const height = event.nativeEvent.layout.height;
        this.setState({
            maxHeight: height,
        });
    }

    _setMinHeight(event: any){
        const height = event.nativeEvent.layout.height;
        this.setState({
            minHeight: height,
        });
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
            <Animated.View style={[styles.container,{height: this.state.animation}]}>

                <TouchableOpacity
                    style={styles.titleContainer}
                    onPress={this.toggle.bind(this)}
                    onLayout={this._setMinHeight.bind(this)}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        {icon}
                </TouchableOpacity>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

             </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop:10,
        overflow: Platform.OS === 'ios' ?  'scroll': 'hidden',
        marginBottom:10
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        padding: 0,
        fontWeight:'bold'
    },
    body: {
        padding: 0,
        paddingTop: 0,
    }
});