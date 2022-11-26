import Toast from 'react-native-toast-message';

export const showToast = (type, msg, description) => {
    Toast.show({
        type: type,
        text1: msg,
        text2: description
    });
}