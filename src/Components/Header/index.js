import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native';
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


const Header = ({ showLeft, title, showRight, navigation }) => {
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height

    if (showLeft) {
        return (
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <AntDesign style={{ marginLeft: 20 }} name='left' color={'#150E68'} size={18} />
                </TouchableOpacity>
                <View style={{ width: windowWidth - 80, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18 }}>{title}</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ display: 'flex', marginTop: 40, alignItems: 'center' }}>
                <View style={{ width: windowWidth - 80, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18 }}>{title}</Text>
                </View>
            </View>
        )
    }
}


export default Header