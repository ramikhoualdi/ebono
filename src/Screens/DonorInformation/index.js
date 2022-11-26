import React, { useState } from 'react';
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
import Carousel from 'react-native-snap-carousel';
import { TextInput } from 'react-native-paper';
import RootView from '../../Components/RootView';

const DonorInformation = () => {
    const [text, setText] = useState("");
    const [expandVerification, setExpandVerification] = useState(false);
    const [expandGeneral, setExpandGeneral] = useState(false)
    const [expandDonor, setExpandDonor] = useState(false)

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <SafeAreaView>
                <View style={{ marginTop: 60, backgroundColor: 'white', marginLeft: 20, marginRight: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center' }}>
                        <View>
                            <Text>Enter Verification Code</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setExpandVerification(!expandVerification)}>
                                <AntDesign name={expandVerification ? 'arrowup' : 'arrowdown'} color={'#150E68'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        expandVerification && (
                            <View style={{ margin: 20 }}>
                                <TextInput
                                    mode='outlined'
                                    label="Email"
                                    value={text}
                                    onChangeText={text => setText(text)}
                                    style={{ backgroundColor: 'white' }}
                                />
                            </View>

                        )
                    }
                </View>
                <View style={{ marginTop: 30, backgroundColor: 'white', marginLeft: 20, marginRight: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center' }}>
                        <View>
                        <Text>General recipient (Open to Public)</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setExpandGeneral(!expandGeneral)}>
                                <AntDesign name={expandGeneral ? 'arrowup' : 'arrowdown'} color={'#150E68'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        expandGeneral && (
                            <View style={{ margin: 20 }}>
                                <TextInput
                                    mode='outlined'
                                    label="Email"
                                    value={text}
                                    onChangeText={text => setText(text)}
                                    style={{ backgroundColor: 'white' }}
                                />
                            </View>

                        )
                    }
                </View>
                <View style={{ marginTop: 30, backgroundColor: 'white', marginLeft: 20, marginRight: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center' }}>
                        <View>
                        <Text>Donor (Open to Public)</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setExpandDonor(!expandDonor)}>
                                <AntDesign name={expandDonor ? 'arrowup' : 'arrowdown'} color={'#150E68'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        expandDonor && (
                            <View style={{ margin: 20 }}>
                                <TextInput
                                    mode='outlined'
                                    label="Email"
                                    value={text}
                                    onChangeText={text => setText(text)}
                                    style={{ backgroundColor: 'white' }}
                                />
                            </View>

                        )
                    }
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}

export default DonorInformation