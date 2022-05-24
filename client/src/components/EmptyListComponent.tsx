import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors } from '../assets/Colors';

type EmptyListComponentPropsType = {
    text: string,
    style?: ViewStyle
}

const ICON_NAME = 'emoticon-sad-outline';
const ICON_SIZE = 70;

export const EmptyListComponent = (props: EmptyListComponentPropsType) => {
    const { text, style } = props;

    return (
        <View style={[styles.emptyContainer, style]}>
            <Icon name={ICON_NAME} size={ICON_SIZE} color={Colors.tin} />
            <Text style={styles.emptyText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 20,
        color: Colors.verifiedBlack
    }
});
