import { useState } from 'react'
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
import { useDispatch } from 'react-redux';
import { selectUser } from '../../actions/auth';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';




const Button = ({ title, colors, onHandlePress }) => {
    const blueGradient = ['#3CA0F0', '#1247FF']
    const orgGradient = ['#F88435', '#FF2F12']
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={onHandlePress} style={{ alignItems: 'center', borderRadius: 10, justifyContent: 'center', backgroundColor: colors == 'blueGradient' ? '#3CA0F0' : '#F88435', marginBottom: 20, borderRadius: 20, width: 300, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                {/* <LinearGradient colors={colors == 'blueGradient' ? blueGradient : orgGradient} style={{ marginBottom: 20, borderRadius: 20, width: 300, height: 60, alignItems: 'center', justifyContent: 'center' }}> */}
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
                {/* </LinearGradient> */}
            </TouchableOpacity>
        </View>
    )
}

export default Button