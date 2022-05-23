import AsyncStorage from '@react-native-async-storage/async-storage';

export enum AsyncStorageKeysEnum {
    token = '@token'
}

class AsyncStorageHelper {
    static async set(key: AsyncStorageKeysEnum, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    }

    static async get(key: AsyncStorageKeysEnum): Promise<string | void> {
        try {
            const item = await AsyncStorage.getItem(key);
            return item ?? '';
        } catch (error) {
            console.log(error);
        }
    }

    static async remove(key: AsyncStorageKeysEnum): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    }
}

export default AsyncStorageHelper;
