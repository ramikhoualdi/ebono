import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableOpacity, Image } from 'react-native';
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
import DonorView from '../../Components/DonorView';

const DonorPrice = (props) => {
    const [donorData, setDonorData] = useState([
        {
            id: 1,
            title: '$1.00 - $5.00 once every 3 weeks',
            selected: true
        },
        {
            id: 2,
            title: '$5.00 - $10.00 once every 4 weeks',
            selected: false
        },
        {
            id: 3,
            title: '$10.00 - $20.00 once a month',
            selected: false
        },
        {
            id: 4,
            title: '$20.00 - $35.00 once every six weeks',
            selected: false
        },
        {
            id: 5,
            title: '$35.00 - $50.00 once every three months',
            selected: false
        }
    ])

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
        <DonorView navigation={props.navigation} navParam={'MerchantList'} title={'Donor'} subTitle={'Select Price Category'}>
            <View style={{ marginTop: 20 }}>
                {
                    donorData.map(val => (
                        <View key={val.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', margin: 10, padding: 10, marginLeft: 20, marginRight: 20, borderRadius: 10 }}>
                            <RadioButton.Android status={val.selected ? 'checked' : 'unchecked'} />
                            <Text style={{ fontFamily: 'Poppins_500Medium' }}>{val.title}</Text>
                        </View>
                    ))
                }
            </View>
            <View>
                <ImageBackground source={require('../../../assets/flag.png')} style={{ margin: 20, alignItems: 'center', marginTop: 10 }} imageStyle={{ borderRadius: 10 }}>
                    <Text style={{ padding: 30, color: 'white', fontFamily: 'Poppins_600SemiBold' }}>Kindness Is Contagious</Text>
                </ImageBackground>
            </View>
            <View>
                <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('AddToCart')} style={category == undefined || null ? styles.disableBtnStyle : styles.btnStyle}>
                        <AntDesign name='arrowright' color={category == undefined || null ? 'grey' : '#150E68'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </DonorView>

    )
}

export default DonorPrice