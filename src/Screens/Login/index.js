import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../actions/auth';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../Components/Button';
import BorderBackground from '../../Components/BorderBackground';
import { Checkbox } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import api from '../../utils/api';
import Toast from 'react-native-toast-message';



const Login = (props) => {
    let selectedUser = useSelector(state => state.auth.selectedUser);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async () => {
        await api({
            method: 'POST',
            url: '/auth/email-login',
            data: {
                email: email,
                password: password
            }
        }).then((res) => {
            console.log(res.data)
            Toast.show({
                type: 'success',
                text1: 'Login',
                text2: 'User Logged In Successfully'
            })
            // props.navigation.navigate('Login')
            //Check Login Type
            if (res.data.user.type === selectedUser) {
                props.navigation.navigate('PhoneLogin', {
                    email: email
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login',
                    text2: `User Is Already Registered As ${res.data.user.type}, Kindly Login Back Using The Role You Have Registered For`
                })
                props.navigation.navigate('SelectUser')
            }
        }).catch((err) => {
            console.log(err)
            const errors = err.response.data.errors
            if (errors) {
                errors.forEach(error => Toast.show({
                    type: 'error',
                    text1: 'Login',
                    text2: `${error.msg}`
                }))
            }
        })
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ margin: 40, alignItems: 'center' }} source={require('../../../assets/newLogo.png')} />
                        <Text style={{ fontSize: 22, fontFamily: 'Poppins_600SemiBold' }}>Sign In</Text>
                    </View>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={{ marginTop: 80, marginLeft: 20, marginRight: 20, marginBottom: 40 }}>
                        <TextInput
                            label="Email"
                            value={email}
                            // left={<TextInput.Affix text={'+'} />}
                            onChangeText={email => setEmail(email)}
                            style={{ backgroundColor: 'white', borderRadius: 20, fontSize: 14, borderColor: '#999999', borderWidth: 1 }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            // keyboardType='phone-pad'
                            // returnKeyLabel='Return'
                            theme={{ roundness: 20, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: '#999999', text: 'black', primary: 'black' } }}
                        />
                    </View>
                    <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                        <TextInput
                            label="Password"
                            value={password}
                            // left={<TextInput.Affix text={'+'} />}
                            onChangeText={password => setPassword(password)}
                            style={{ backgroundColor: 'white', borderRadius: 20, fontSize: 14, borderColor: '#999999', borderWidth: 1 }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            secureTextEntry={true}
                            // keyboardType='phone-pad'
                            // returnKeyLabel='Return'
                            theme={{ roundness: 20, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: '#999999', text: 'black', primary: 'black' } }}
                        />
                        <View style={{ alignItems: 'flex-end', marginTop: 10, marginRight: 10 }}>
                            <TouchableOpacity onPress={()=>props.navigation.navigate('ForgotPassword')}>
                                <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'grey' }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                    <Button title={'Login'} colors={'blueGradient'} onHandlePress={() => onLogin()} />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                            <Text style={{ fontFamily: 'Poppins_500Medium', color: 'grey' }}>Don't Have An Account? <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'grey' }}>Sign Up</Text></Text>
                        </TouchableOpacity>
                    </View>
            </View>


        </SafeAreaView>
    )
}

export default Login