import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

export default class customizedButton extends Component {
    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return (
            <TouchableOpacity
                ref={component => this._root = component} {...this.props}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText} >{this.props.label}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        color: "#000000",
        alignSelf: "center",
        marginTop: 9,
        fontFamily: 'roboto'
    }
});