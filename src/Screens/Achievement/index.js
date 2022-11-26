import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../actions/user';
import GeneralView from '../../Components/GeneralView';


const Achievement = (props) => {
    const dispatch = useDispatch()
    return (
        <GeneralView>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/image1.png')} />
            </View>
            <View style={{ marginBottom: 30, marginTop: 20 }}>
                <TouchableOpacity onPress={()=>{
                    dispatch(clearCart())
                    props.navigation.navigate('HomeTabs')
                }} style={{ backgroundColor: '#150E68', marginLeft: 30, marginRight: 30, padding: 20, alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: 'white' }}>Finish</Text>
                </TouchableOpacity>
            </View>
        </GeneralView>
    )
}

export default Achievement