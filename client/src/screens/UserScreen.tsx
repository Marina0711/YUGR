import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { observer } from 'mobx-react-lite';

import { HeaderComponent } from '../components/HeaderComponent';
import { OrderListComponent } from '../components/OrderListComponent';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { orderStore } from '../store/OrderStore';
import { RoleEnum } from '../store/types';
import { userStore } from '../store/UserStore';

const ICON_USER = 'account';
const ICON_COG = 'book-cog-outline';
const ICON_USER_SIZE = 110;
const ICON_COG_SIZE = 40;

export const UserScreen = observer(() => {
    const { id, firstName, lastName, email, phoneNumber, role } = userStore.user!;
    const isAdmin = role === RoleEnum.admin;

    useEffect(() => {
        orderStore.fetchOrders(id);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent isLogoutButton title={Strings.userScreen.profile} />
            <View style={styles.content}>
                <View style={styles.userCard}>
                    <Icon name={ICON_USER} size={ICON_USER_SIZE} color={Colors.offBlack} />
                    <View style={{ flex: isAdmin ?  0.9 : 1 }}>
                        <Text style={styles.name}>{firstName} {lastName}</Text>
                        <Text style={styles.personalData}>{email}</Text>
                        <Text style={styles.personalData}>{phoneNumber}</Text>
                    </View>
                    {isAdmin && (
                        <TouchableOpacity>
                            <Icon name={ICON_COG} size={ICON_COG_SIZE} color={Colors.kettleman} />
                        </TouchableOpacity>
                    )}
                </View>
                <OrderListComponent data={orderStore.orders} />
            </View>
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
        justifyContent: 'space-between',
        borderRadius: 8,
        paddingVertical: 5,
        paddingRight: 20,
        backgroundColor: Colors.christmasSilver,
    },
    personalData: {
        fontSize: 14,
        marginTop: 3,
        color: Colors.tin
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
    }
});
