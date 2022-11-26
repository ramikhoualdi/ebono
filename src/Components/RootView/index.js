import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, ScrollView } from 'react-native';

const RootView = ({ children }) => {
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height
    return (
        <ScrollView showsVerticalScrollIndicator={false}>            

        <SafeAreaView>
                <ImageBackground source={require('../../../assets/newBackground.png')} style={{ width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: windowHeight - 250 }}>
                    <ImageBackground source={require('../../../assets/borderRectangle.png')} style={{ width: windowWidth, height: windowHeight }}>
                        {children}
                    </ImageBackground>
                </View>

            </ImageBackground>

        </SafeAreaView>
        </ScrollView>

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


export default RootView