import { StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';

import { Colors } from '../assets/Colors';

const TOAST_DURATION = 3000;

export const displayErrorToast = (errorText: string) => {
    Toast.show(errorText, {
        duration: TOAST_DURATION,
        hideOnPress: true,
        containerStyle: styles.toastContainer,
        textStyle: styles.toastText,
        shadow: false,
        opacity: 0.4,
    });
};

const styles = StyleSheet.create({
    toastContainer: {
        marginHorizontal: 20,
        bottom: 30,
        backgroundColor: Colors.kettleman,
    },
    toastText: {
        color: Colors.white,
        paddingHorizontal: 20
    }

});
