import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import { rateProduct } from '../api/RatingApi';

import { Colors } from '../assets/Colors';
import { Strings } from '../assets/Strings';
import { displayErrorToast } from '../helpers/ToastDisplayHelper';
import { userStore } from '../store/UserStore';

import { HeaderLogoComponent } from './HeaderLogoComponent';
import { LightButtonComponent } from './LightButtonComponent';
import { StarsComponent } from './StarsComponent';

type RatingModalComponentPropsType = {
    isModalVisible: boolean,
    toggleModal: () => void,
    productId: number
}

const ANIMATION_TYPE = 'pulse';
const ANIMATION_OUT_TIMING = 100;
const ICON_SIZE = 40;

export const RatingModalComponent = (props: RatingModalComponentPropsType) => {
    const { isModalVisible, productId, toggleModal } = props;
    const [rate, setRate] = useState<number>(0);

    const onBackdropPress = () => {
        toggleModal();
        setRate(0);
    };

    const onPressButton = async () => {
        try {
            await rateProduct({ rate, user: userStore.user!.id, productId });
            toggleModal();
        } catch (e) {
            displayErrorToast(e.message);
        }
    };

    return (
        <Modal
            isVisible={isModalVisible}
            animationIn={ANIMATION_TYPE}
            animationOut={ANIMATION_TYPE}
            animationOutTiming={ANIMATION_OUT_TIMING}
            onBackdropPress={onBackdropPress}
        >
            <View style={styles.content}>
                <HeaderLogoComponent style={styles.header} />
                <StarsComponent rate={rate} setRate={setRate} iconSize={ICON_SIZE} />
                <LightButtonComponent
                    title={Strings.ratingModal.rateProduct}
                    style={styles.button}
                    onPress={onPressButton}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: Colors.pixelWhite,
        borderRadius: 8,
        alignItems: 'center',
        padding: 25,
    },
    header: {
        marginTop: 0,
        marginBottom: 20
    },
    button: {
        paddingHorizontal: 15,
        marginTop: 20
    }
});
