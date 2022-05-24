import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '../assets/Colors';

type LoadingComponentPropsType = {
    style?: ViewStyle
}

export const LoadingComponent = (props: LoadingComponentPropsType) => {
    const { style } = props;

    return (
        <View style={[styles.loading, style]}>
            <ActivityIndicator size={'large'} color={Colors.verifiedBlack}  />
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.pixelWhite
    }
});
