import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Animated, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

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
            animation: new Animated.Value(20)
        };
    }

    toggle(){
        let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
        let finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue,
                useNativeDriver: false
            }
        ).start();
    }

    _setMaxHeight(event: any){
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event: any){
        this.setState({
            minHeight: event.nativeEvent.layout.height
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
                    onLayout={this._setMinHeight.bind(this)}
                    style={styles.titleContainer}
                    onPress={this.toggle.bind(this)}>
                    
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

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop:10,
        overflow:'hidden'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        padding: 0,
        fontWeight:'bold'
    },
    button: {

    },
    body: {
        padding: 0,
        paddingTop: 0
    }
});