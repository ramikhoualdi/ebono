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
import Header from '../../Components/Header';
import BorderBackground from '../../Components/BorderBackground';


const SafeSecure = (props) => {

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
        <View>
            <Header showLeft={true} title='Safe & Secure' navigation={props.navigation}/>
            <View style={{alignItems:'center', marginTop:20}}>
                <Image style={{width:280, height:280}} source={require('../../../assets/CharityImg1.png')}/>
            </View>
            <View style={{ marginTop: 10, margin:40, marginBottom:10 }}>
                <Text style={{fontFamily:'Poppins_400Regular', textAlign:'center'}}>Our commitment is to keep you safe. eBono's product-based donation and tracking system guarantees your purchase will go directly to the intended recipient.</Text>
            </View>
        </View>
    )
}

export default SafeSecure