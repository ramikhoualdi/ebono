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
import { TextInput } from 'react-native-paper';
import RootView from '../../Components/RootView';
import { useSelector } from 'react-redux';


const DonorLocation = (props) => {
    let selectedUser = useSelector(state => state.auth.selectedUser);
    const [zipCode, setZipCode] = useState("");

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
            <View style={{ margin: 40, marginTop: 60, marginBottom: 20 }}>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>Donor / Recipient</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Image source={require('../../../assets/map.png')} />
            </View>
            <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <TextInput
                    mode='outlined'
                    label="State - Zipcode"
                    value={zipCode}
                    onChangeText={zipCode => setZipCode(zipCode)}
                    style={{ backgroundColor: 'white', borderRadius: 10 }}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    theme={{ roundness: 10, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: 'black', text: 'black', primary: 'black' } }}
                />
            </View>
            <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 20 }}>
                <TouchableOpacity onPress={()=>props.navigation.navigate(selectedUser === 'Donor' ? 'DonorPrice' : 'MerchantList')} style={styles.btnStyle}>
                    <AntDesign name='arrowright' color={'#150E68'} size={20} />
                </TouchableOpacity>
            </View>
        </RootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnStyle: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: '#150E68',
        alignItems: 'center'
    }
});

export default DonorLocation