import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import Carousel from 'react-native-snap-carousel';
import RootView from '../../Components/RootView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';


const TargetGiving = (props) => {
    let selectedUser = useSelector(state => state.auth.selectedUser);

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
        <View style={{ backgroundColor: 'white' }}>
            <Header showLeft={true} title='Target Giving' navigation={props.navigation} />
            <View style={{ marginTop: 80, margin: 40 }}>
                <Text style={{ fontFamily: 'Poppins_400Regular', textAlign: 'center' }}>With The Donation Delivery App, You Can Help
                    Deliver Products Directly Into The Hands Of Those
                    In Need With Only A Few Clicks Of A Button.</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 40, marginRight: 20 }}>
                <Image style={{ width: 300, height: 200 }} source={require('../../../assets/charity.gif')} />
            </View>
        </View>
    )
}

export default TargetGiving