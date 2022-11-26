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
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';



const BorderBackground = ({children}) => {
    return (
        <View style={{flex:1, borderColor:'#3CA0F0', borderWidth:4, marginLeft:6, marginRight:6, marginTop:40, borderRadius:10, marginBottom:20}}>
            {children}
        </View>
    )
}


export default BorderBackground