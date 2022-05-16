import React from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import { RootNavigator } from './src/navigation/RootNavigator';

const App = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <RootNavigator />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});
