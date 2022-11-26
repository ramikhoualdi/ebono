import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import BorderBackground from "../../Components/BorderBackground";
import { Audio } from "expo-av";

const Welcome = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [sound, setSound] = useState();
  const [isPlayed, setIsPlayed] = useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/audio.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    if (!isPlayed) {
      playSound();
      setIsPlayed(true);
    }

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound, isPlayed]);

  let [fontsLoaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        borderColor: "#3CA0F0",
        borderWidth: 4,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 40,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      {/* <BorderBackground> */}
      {/* <ImageBackground source={require('../../../assets/newBackground.png')} style={{ width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <View style={styles.cardView}>
                    <Image style={{ width: 180, height: 70, marginTop:40 }} source={require('../../../assets/newLogo.png')} />
                    <Text style={styles.cardTitle}>Welcome</Text>
                    <Text style={styles.cardSubtitle}>Thank you for downloading the donation delivery app</Text>
                </View>
            </ImageBackground> */}
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 320, height: 320 }}
          source={require("../../../assets/ebonoSplash.gif")}
        />
      </View>
      {/* </BorderBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardView: {
    backgroundColor: "#F4F4F4",
    height: 420,
    width: 300,
    borderRadius: 20,
    alignItems: "center",
  },
  cardTitle: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Poppins_700Bold",
  },
  cardSubtitle: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Poppins_300Light",
    padding: 20,
    color: "#A6A6A6",
  },
});

export default Welcome;
