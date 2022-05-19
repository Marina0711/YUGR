import React from 'react';
import {
    Image,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    TextInput,
    TextInputFocusEventData, TouchableOpacity,
    View
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

import { Colors } from '../assets/Colors';
import eye from '../assets/icons/eye.png';

type TextInputComponentPropsType = {
    value: string,
    label: string,
    onChangeText: (text: string) => void,
    onBlur?: (e:  NativeSyntheticEvent<TextInputFocusEventData>) => void,
    isPassword?: boolean,
    mask?: string,
    onClickEye?: () => void
}

export const TextInputComponent = (props: TextInputComponentPropsType) => {
    const { value, label, isPassword, mask, onChangeText, onBlur, onClickEye } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {
                mask ? (
                    <TextInputMask
                        value={value}
                        style={styles.text}
                        mask={mask}
                        onChangeText={onChangeText}
                        onBlur={onBlur}
                    />
                ) : (
                    <TextInput
                        value={value}
                        textContentType={'oneTimeCode'}
                        style={styles.text}
                        secureTextEntry={isPassword}
                        onChangeText={onChangeText}
                        onBlur={onBlur}
                    />
                )
            }
            {
                onClickEye && (
                    <TouchableOpacity onPress={onClickEye}>
                        <Image
                            source={eye}
                            style={styles.yey}
                        />
                    </TouchableOpacity>

                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: Colors.christmasSilver
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19,
        color: Colors.tin
    },
    text: {
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 5,
        color: Colors.verifiedBlack
    },
    yey: {
        position: 'absolute',
        right: 10,
        bottom: 5
    }
});
