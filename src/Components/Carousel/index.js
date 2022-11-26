import { useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import RootView from '../../Components/RootView';
import SelectUser from '../../Screens/SelectUser';
import DonorInformation from '../../Screens/DonorInformation';
import SafeSecure from '../../Screens/SafeSecure';
import TargetGiving from '../../Screens/TargetGiving';
import { useSelector } from 'react-redux';
import BorderBackground from '../BorderBackground';



const CustomCarousel = (props) => {
    let selectedUser = useSelector(state => state.auth.selectedUser);
    var carouselRef = useRef()
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height

    const [activeIndex, setActiveIndex] = useState(0)

    const SCREENS = [
        <TargetGiving />,
        <SafeSecure />
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', borderColor: '#3CA0F0', borderWidth: 4, marginLeft: 6, marginRight: 6, marginTop: 40, borderRadius: 10, marginBottom: 20 }}>
            {/* <BorderBackground> */}
            {/* <RootView> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Carousel
                        ref={carouselRef}
                        data={SCREENS}
                        renderItem={({ item }) => item}
                        sliderWidth={windowWidth}
                        itemWidth={windowWidth}
                        sliderHeight={windowHeight}
                        onSnapToItem={(i) => setActiveIndex(i)}

                    />
                    <View style={{ marginTop: 10 }}>
                        <Pagination
                            dotsLength={SCREENS.length}
                            activeDotIndex={activeIndex}
                            dotElement={<Image style={{margin:10}} source={require('../../../assets/active.png')} />}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            inactiveDotElement={<Image style={{margin:10}} source={require('../../../assets/inactive.png')} />}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-end', marginRight:10 }}>
                        <TouchableOpacity disabled={selectedUser === undefined || null ? true : false} onPress={(i) => { activeIndex === 1 ? props.navigation.navigate('Login') : carouselRef.current.snapToNext() }} style={selectedUser === undefined || null ? styles.disableBtnStyle : styles.btnStyle}>
                            <AntDesign name='arrowright' color={selectedUser === undefined || null ? 'grey' : 'white'} size={20} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            {/* </RootView> */}
            {/* </BorderBackground> */}
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
    btnStyle: {
        width: 60,
        height:60,
        padding: 10,
        borderRadius: 60/2,
        backgroundColor: '#3CA0F0',
        margin: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    disableBtnStyle: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center'
    }
});

export default CustomCarousel