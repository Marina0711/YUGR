import React from 'react'
import {Platform, SafeAreaView, StatusBar, StyleSheet} from "react-native";

export const ProductScreen = () => {
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor: COLORS.white_light,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
});
