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



const Notification = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
        <Header title='Notification'/>
        </SafeAreaView>
    )
}

export default Notification