import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';


const AuthView = ({ children, title, navigation, hideBack }) => {
    const dispatch = useDispatch()
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height

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

        <SafeAreaView >
            <ImageBackground source={require('../../../assets/newBackground.png')} style={{ width: windowWidth, height: windowHeight }}>

                <View style={{ display: 'flex', flexDirection: 'row', margin: 40, marginTop: 60, alignItems: 'center' }}>
                    {
                        !hideBack &&
                        <TouchableOpacity onPress={() => navigation.pop()} style={{ backgroundColor: 'white', padding: 12, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name='left' color={'#150E68'} size={22} />
                        </TouchableOpacity>
                    }
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ marginLeft: 30, color: 'white', fontFamily: 'Poppins_600SemiBold', fontSize: 20 }}>{title}</Text>
                        <TouchableOpacity onPress={() => dispatch(logout())} style={{ marginRight: 20 }}>
                            <AntDesign name='logout' color={'white'} size={22} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ position: 'absolute', bottom: -10 }}>
                    <ImageBackground source={require('../../../assets/borderRectangle.png')} style={{ width: windowWidth, height: windowHeight - 100 }}>
                        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                        {children}
                        {/* </ScrollView> */}
                    </ImageBackground>
                </View>
            </ImageBackground>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default AuthView