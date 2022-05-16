import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '../assets/Colors';

type ErrorStringPropsType = {
    text: string
}

export const ErrorTextComponent = (props: ErrorStringPropsType) => {
    const { text } = props;

    return(
        <Text style={styles.text}>{text}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: Colors.pleasantPomegranate
    }
});
