import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';

const GeneralView = ({ children }) => {
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    return (
        <SafeAreaView>
            <ImageBackground source={require('../../../assets/newBackground.png')} style={{ width: windowWidth, height: windowHeight }}>
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <Image source={require('../../../assets/newLogo.png')} />
                </View>
                <View style={{ position: 'absolute', bottom: -10 }}>
                    <ImageBackground source={require('../../../assets/box.png')} style={{ width: windowWidth, height: 450 }} imageStyle={{ borderRadius: 30 }}>
                        {children}
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


export default GeneralView