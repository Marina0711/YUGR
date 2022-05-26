import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { Colors } from '../assets/Colors';

type ButtonComponentPropsType = {
    title: string,
    onPress: () => void,
    isDisabled?: boolean,
    style?: ViewStyle
}

export const DarkButtonComponent = (props: ButtonComponentPropsType) => {
    const { title, isDisabled, onPress, style } = props;

    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{
                ...styles.container,
                ...style,
                backgroundColor: isDisabled ? Colors.tin : Colors.verifiedBlack
            }}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
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

