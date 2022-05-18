import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '../assets/Colors';

type HeaderComponentPropsType = {
    title?: string,
    isBackButton?: boolean
}

export const HeaderComponent = (props: HeaderComponentPropsType) => {
    const { title, isBackButton = false } = props;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.block}>
                {isBackButton && (
                    <Pressable onPress={navigation.goBack}>
                        <Icon
                            name={'arrow-left'}
                            size={25}
                            color={Colors.verifiedBlack}
                        />
                    </Pressable>
                )}
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.block} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    },
    block: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        flex: 4,
        textAlign: 'center',
        fontSize: 18,
        color: Colors.verifiedBlack
    },
});
