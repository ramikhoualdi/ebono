import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import GeneralView from '../../Components/GeneralView';


const TaxInformation = (props) => {

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
        <GeneralView>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/image3.png')} />
                <Text style={{ marginTop: 10, textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize:16 }}>Your Contribution Are</Text>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_600SemiBold', fontSize:16 }}>Tax Deductible</Text>
            </View>
            <View style={{ marginBottom: 30, marginTop: 20 }}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('DonorCalendar')} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Finish</Text>
                </TouchableOpacity>
            </View>
        </GeneralView>
    )
}

export default TaxInformation