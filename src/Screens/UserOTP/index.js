import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-paper';
import RootView from '../../Components/RootView';
import { firebaseConfig } from '../../config'
import firebase from 'firebase/compat/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';



const UserOTP = (props) => {
    const { phone, verificationId, email } = props.route.params
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [password, setPassword] = useState("")
    const [hidePass, setHidePass] = useState(false)
    const element = <TextInput.Icon color='#A6A6A6' name={hidePass ? "eye" : "eye-off"} onPress={() => setHidePass(!hidePass)} />
    const recaptchaVerifier = useRef(null)
    let selectedUser = useSelector(state => state.auth.selectedUser);

    const confirmCode = () => {
        console.log(verificationId, 'HHHEHEHEHE')
        const creds = firebase.auth.PhoneAuthProvider.credential(verificationId, code)
        firebase.auth().signInWithCredential(creds).then((res) => {
            console.log(res)
            dispatch(login(phone, selectedUser, email))
            setCode('')
        }).catch(err => {
            console.log(err)
        })

    }

    let [fontsLoaded, error] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold
    })

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 30 : 0


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            {/* <BorderBackground> */}
                <View style={{ justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', marginTop: 60 }}>
                        <Image style={{ width: 280, height: 280 }} source={require('../../../assets/otp.png')} />
                    </View>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={{ marginTop: 80, marginLeft: 20, marginRight: 20, marginBottom: 40 }}>
                        <Text style={{ color: 'grey', fontFamily: 'Poppins_600SemiBold', marginBottom: 10 }}>Enter the 6 digit OTP you’ve received on you number</Text>
                        <TextInput
                            label="Code"
                            value={code}
                            onChangeText={code => setCode(code)}
                            style={{ backgroundColor: 'white', borderRadius: 20, fontSize: 14, borderColor: '#999999', borderWidth: 1 }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            // keyboardType='phone-pad'
                            theme={{ roundness: 20, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: '#999999', text: 'black', primary: 'black' } }}
                        />
                    </View>
            </KeyboardAvoidingView>

                    <View>
                        <View>
                            <Button title={'Verify'} colors={'blueGradient'} onHandlePress={() => confirmCode()} />
                        </View>
                        {/* <TouchableOpacity onPress={() => confirmCode()} style={{ backgroundColor: '#150E68', padding: 15, marginLeft: 20, marginRight: 20, borderRadius: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins_700Bold' }}>Sign In</Text>
                </TouchableOpacity> */}
                    </View>
                </View>
            {/* </BorderBackground> */}
        </SafeAreaView>
    )
}

export default UserOTP