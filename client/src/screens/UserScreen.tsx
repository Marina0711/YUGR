import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import { observer } from 'mobx-react-lite';

import { HeaderComponent } from '../components/HeaderComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { userStore } from '../store/UserStore';

const ICON_NAME = 'user';
const ICON_SIZE = 110;

export const UserScreen = observer(() => {
    const { firstName, lastName, email, phoneNumber } = userStore.user!;

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent isLogoutButton title={Strings.userScreen.profile} />
            <ScrollView style={styles.content}>
                <View style={styles.userCard}>
                    <Icon name={ICON_NAME} size={ICON_SIZE} color={Colors.tin} />
                    <View>
                        <Text style={styles.name}>{firstName} {lastName}</Text>
                        <Text style={styles.personalData}>{email}</Text>
                        <Text style={styles.personalData}>{phoneNumber}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.pixelWhite,
        borderRadius: 8,
        paddingVertical: 5
    },
    personalData: {
        fontSize: 14,
        marginTop: 3,
        color: Colors.tin
    },
    name: {
        fontSize: 20
    }
});
