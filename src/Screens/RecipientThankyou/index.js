import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AntDesign from '@expo/vector-icons/AntDesign';
import AuthView from '../../Components/AuthView';
import { TextInput } from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../utils/toast';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import BorderBackground from '../../Components/BorderBackground';



const RecipientThankyou = (props) => {
    const blueGradient = ['#3CA0F0', '#1247FF']
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            {/* <BorderBackground> */}
                <Header showLeft={true} title='Thank You' navigation={props.navigation} />
                <View style={{ backgroundColor: '#3CA0F0', margin: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>You will be notified when your donation request is out for delivery</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>Your product(s) will be delivered to the address you provided in the enrollment process.</Text>
                    </View>
                </View>

                <Button title={'Continue'} onHandlePress={() => {
                    props.navigation.navigate('HomeTabs')
                }} />
                <View style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'green', borderRadius: 60 / 2, height: 60, width: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name='check' color={'white'} size={32} />
                    </View>
                </View>

            {/* </BorderBackground> */}
        </SafeAreaView>
    )
}


export default RecipientThankyou