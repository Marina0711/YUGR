import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '../assets/Colors';
import AsyncStorageHelper, { AsyncStorageKeysEnum } from '../helpers/AsyncStorageHelper';
import { userStore } from '../store/UserStore';

type HeaderComponentPropsType = {
    title?: string,
    isBackButton?: boolean,
    isLogoutButton?: boolean
}

const ICON_ARROW = 'keyboard-arrow-left';
const ICON_LOGOUT = 'logout';
const ICON_ARROW_SIZE = 40;
const ICON_LOGOUT_SIZE = 30;

export const HeaderComponent = (props: HeaderComponentPropsType) => {
    const { title, isBackButton = false, isLogoutButton = false } = props;
    const navigation = useNavigation();

    const logout = async () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        await AsyncStorageHelper.remove(AsyncStorageKeysEnum.token);
    };

    return (
        <View style={styles.container}>
            <View style={styles.block}>
                {isBackButton && (
                    <Pressable onPress={navigation.goBack}>
                        <Icon
                            name={ICON_ARROW}
                            size={ICON_ARROW_SIZE}
                            color={Colors.verifiedBlack}
                        />
                    </Pressable>
                )}
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.block}>
                {isLogoutButton && (
                    <Pressable onPress={logout}>
                        <Icon
                            name={ICON_LOGOUT}
                            size={ICON_LOGOUT_SIZE}
                            color={Colors.verifiedBlack}
                        />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12
    },
    block: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        flex: 4,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: Colors.verifiedBlack
    },
});
