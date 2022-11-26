import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
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
import RootView from '../../../Components/RootView';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [hidePass, setHidePass] = useState(false)
    const element = <TextInput.Icon color='#A6A6A6' name={hidePass ? "eye" : "eye-off"} onPress={() => setHidePass(!hidePass)} />

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

    return (
        <RootView>
            <View style={{ marginTop: 80, marginLeft: 20, marginRight: 20 }}>
                <TextInput
                    label="Email or username"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    style={{ backgroundColor: 'white', borderRadius: 10, fontSize:14  }}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    theme={{ roundness: 10, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                />
            </View>
            <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    style={{ backgroundColor: 'white', borderRadius: 10, fontSize:14 }}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    theme={{ roundness: 10, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                    right={element}
                />
            </View>
            <View style={{ display: 'flex', alignItems: 'flex-end', marginRight: 20, marginTop: 10 }}>
                <TouchableOpacity>
                    <Text style={{ color: '#A6A6A6', fontFamily: 'Poppins_600SemiBold' }}>Forgot Password?</Text>

                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={()=>props.navigation.navigate('DonorLocation')} style={{ backgroundColor: '#150E68', padding: 15, marginLeft: 20, marginRight: 20, marginTop: 20, borderRadius: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins_700Bold' }}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center', marginTop:40}}>
                <TouchableOpacity>
                    <Text style={{color:'black', fontFamily:'Poppins_600SemiBold'}}>Not a member? <Text style={{color:'#150E68'}}>Register now</Text></Text>
                </TouchableOpacity>
            </View>
        </RootView>
    )
}

export default Login