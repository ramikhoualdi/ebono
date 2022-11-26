import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AuthView from '../../Components/AuthView';
import api from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../Components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import BorderBackground from '../../Components/BorderBackground';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../../Components/Button';
import { TextInput } from 'react-native-paper';



const CharityAmount = (props) => {
    const {selectedOrg, fromCharity} = props.route.params
    const [amount, setAmount] = useState()
    return (
        <SafeAreaView  style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            <Header showLeft={true} title='Choose Amount To Donate'/>
            
            <View style={{ marginTop: 60, marginLeft: 10, marginRight: 20, marginBottom: 10 }}>
                    <TextInput
                        label="Enter Amount..."
                        value={amount}
                        // left={<TextInput.Affix text={'+'} />}
                        onChangeText={amount => setAmount(amount)}
                        style={{ backgroundColor: 'white', borderRadius: 20, fontSize: 14, borderColor: '#999999', borderWidth: 1 }}
                        underlineColor='transparent'
                        activeUnderlineColor='transparent'
                        theme={{ roundness: 20, fonts: { regular: { fontFamily: 'Poppins_500Medium', color: 'black' } }, colors: { placeholder: '#999999', text: 'black', primary: 'black' } }}
                    />
                </View>
                <Button title={'Continue'} colors={'blueGradient'} onHandlePress={() => {
                    props.navigation.navigate('PaymentMethod', {
                        amount:amount,
                        fromCharity:fromCharity,
                        selectedOrg:selectedOrg
                    })
                }} />
        </SafeAreaView>
    )
}

export default CharityAmount