import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import SplashScreen from 'react-native-splash-screen';

import { observer } from 'mobx-react-lite';

import { refreshToken } from './src/api/UserApi';

import { LoadingComponent } from './src/components/LoadingComponent';

import { authSubmitHelper } from './src/helpers/AuthSubmitHelper';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusEnum } from './src/store/types';
import { userStore } from './src/store/UserStore';

const App = observer(() => {
    useEffect(() => {
        SplashScreen.hide();
        authSubmitHelper(() => refreshToken());
    }, []);

    if (userStore.status === StatusEnum.loading) {
        return <LoadingComponent/>;
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
    }
});
