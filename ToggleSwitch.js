/**
 * toggle-switch-react-native
 * Toggle Switch component for react native, it works on iOS and Android
 * https://github.com/aminebenkeroum/toggle-switch-react-native
 * Email:amine.benkeroum@gmail.com
 * Blog: https://medium.com/@aminebenkeroum/
 * @benkeroumamine
 */

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing
} from 'react-native'

import PropTypes from 'prop-types'

class ToggleSwitch extends React.Component{

    constructor(props){
        super(props)
        this.props = props
        this.state = {
            isOn: this.props.isOn,
            label: this.props.label,
            offsetX: new Animated.Value(0),
            initialDirection:  (this.props.isOn) ? {right: 0} : {left: 0},
            dimensions: ToggleSwitch.calculateDimensions(this.props.size),
        }
    }

    static propTypes = {
        isOn: PropTypes.bool.isRequired,
        label: PropTypes.string,
        onColor: PropTypes.string.isRequired,
        offColor: PropTypes.string.isRequired,
        size: PropTypes.string,
        labelStyle: PropTypes.object,
        onToggle: PropTypes.func.isRequired
    }

    static defaultProps = {
        isOn : false,
        onColor: '#634fc9',
        offColor: '#ecf0f1',
        size: 'medium',
        labelStyle: {}
    }

    static calculateDimensions(size) {
        switch(size){
            case 'small':
                return ({
                  width: 50, padding: 10, cercleWidth: 15, cercleHeight: 15, translateX: 22
                });
            case 'large':
                return ({
                  width: 100, padding: 20, cercleWidth: 30, cercleHeight: 30, translateX: 38
                });
            default:
                return ({
                  width: 60, padding: 12, cercleWidth: 18, cercleHeight: 18, translateX: 26
                });
        }
    }
    
    onToggle(){
        
        if(this.props.isOn)
            toValue = (- this.state.dimensions.width + (this.state.dimensions.translateX))
        else
            toValue = 0
    
        Animated.timing(
            this.state.offsetX,
            {
              toValue: toValue,
              duration: 300,
            }                              
        ).start();
        
        let newState = !this.state.isOn

        this.setState({
            ...this.state,
            isOn : newState
        })

        this.props.onToggle(newState)
    }

    createToggleSwitchStyle = () => ({
      justifyContent: 'center',
      width: this.state.dimensions.width,
      borderRadius: 20,
      padding: this.state.dimensions.padding,
      backgroundColor: (this.state.isOn) ? this.props.onColor : this.props.offColor,
    })

    createInsideCercleStyle = () => ({
      ...this.state.initialDirection,
      margin: 4,
      position: 'absolute',
      backgroundColor: 'white',
      transform: [{ translateX: this.state.offsetX }],
      width: this.state.dimensions.cercleWidth,
      height: this.state.dimensions.cercleHeight,
      borderRadius: (this.state.dimensions.cercleWidth / 2),
    });

    render(){
        return (
            <View style={styles.container}>
                {(this.props.label)
                  ? <Text style={[styles.labelStyle, this.props.labelStyle]}>{this.props.label}</Text>
                  : null
                }
                <TouchableOpacity style={this.createToggleSwitchStyle()} activeOpacity={0.8} onPress={this.onToggle.bind(this)}>
                    <Animated.View style={this.createInsideCercleStyle()} />
                </TouchableOpacity>
            </View>
        )
    }

}

export default ToggleSwitch

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle:{
        marginHorizontal: 10,
    }
});