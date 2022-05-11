import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { Colors } from '../assets/Colors';

type ButtonComponentPropsType = {
    title: string,
    onPress: () => void,
    style?: ViewStyle
}

export const DarkButtonComponent = (props: ButtonComponentPropsType) => {
    const { title, onPress,style } = props;

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.verifiedBlack,
        borderRadius: 8,
        paddingVertical: 15
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.white
    }
});

