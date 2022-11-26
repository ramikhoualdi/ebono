import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper';


const DonorView = ({children, title, subTitle, navigation, navParam}) => {
    // console.log(navParam)
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
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop:40, alignItems:'center'}}>
                <Text style={{fontFamily:'Poppins_600SemiBold', fontSize:16}}>{title}</Text>
            </View>
            <View style={{marginLeft:20, marginTop:10}}>
                <Text style={{fontFamily:'Poppins_500Medium', fontSize:16}}>{subTitle}</Text>
            </View>
            <View style={{marginTop:10}}>
                {children}
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
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

export default DonorView