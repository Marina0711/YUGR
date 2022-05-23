import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { observer } from 'mobx-react-lite';

import { Colors } from './src/assets/Colors';
import { authSubmitHelper } from './src/helpers/AuthSubmitHelper';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusEnum } from './src/store/types';
import { userStore } from './src/store/UserStore';

const App = observer(() => {
    useEffect(() => {
        authSubmitHelper();
    }, []);

    if (userStore.status === StatusEnum.loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'large'} color={Colors.verifiedBlack}  />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <RootSiblingParent>
                <RootNavigator />
            </RootSiblingParent>
        </View>
    );
});

export default App;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.pixelWhite
    }
});
