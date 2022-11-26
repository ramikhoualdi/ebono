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
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useDispatch } from "react-redux";
import { selectUser } from "../../actions/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton } from "react-native-paper";
import BorderBackground from "../../Components/BorderBackground";
import * as ImagePicker from "expo-image-picker";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import mime from "mime";

const RecipientProfile = (props) => {
  const [donationTitle, setDonationTitle] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [requestDonation, setRequestDonation] = useState();
  const [recipientChoice, setRecipientChoice] = useState("Wallmart");
  const [userData, setUserData] = useState();
  const [image, setImage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [keyBoardView, setKeyBoardView] = useState(false);

  const getUserToken = async () => {
    var userToken = await AsyncStorage.getItem("token");
    setToken(userToken);
  };

  const getUserProfile = async () => {
    setLoading(true);
    var userToken = await AsyncStorage.getItem("token");
    await api({
      method: "GET",
      url: "/user",
      headers: {
        "x-auth-token": userToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setUserData(res.data);
        if (res.data.firstName) {
          setShowProfile(true);
        } else {
          setShowProfile(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getUserToken();
    getUserProfile();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserProfile();
    }, [token])
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  const onSubmit = async () => {
    const newImageUri = "file:///" + image?.uri.split("file:/").join("");
    setLoading(true);
    const newData = new FormData();
    newData.append("donationTitle", donationTitle);
    newData.append("requestingDonation", requestDonation);
    newData.append("firstName", firstName);
    newData.append("lastName", lastName);
    newData.append("image", {
      uri: image.uri,
      type: mime.getType(newImageUri),
      name: image.uri.split("/").pop(),
    });
    await axios({
      method: "POST",
      url: "https://ebono-server.herokuapp.com/api/user/update",
      headers: {
        "x-auth-token": token,
        "content-type": "multipart/form-data",
      },
      data: newData,
    })
      .then((res) => {
        console.log(res.data);
        // getUserProfile()
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (showProfile) {
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
        <Header title="Profile" navigation={props.navigation} />

        <View style={{ alignItems: "center", marginTop: 30 }}>
          {userData?.profileImage ? (
            <Image
              source={{ uri: userData?.profileImage }}
              style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
            />
          ) : (
            <Image
              source={require("./../../../assets/icons/MaleUser.png")}
              style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
            />
          )}
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: "grey",
              marginTop: 20,
              fontSize: 18,
            }}
          >
            {userData?.firstName + " " + userData?.lastName}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: "grey",
              fontSize: 18,
            }}
          >
            {userData?.email}
          </Text>
        </View>
        <View style={{ margin: 20, marginBottom: 10 }}>
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}>
            About Organisation
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 14,
              color: "grey",
            }}
          >
            {userData.type}
          </Text>
        </View>
        <View style={{ margin: 20, marginTop: 10 }}>
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}>
            Donation Title
          </Text>
          <Text>{userData?.donationTitle}</Text>
        </View>
        <View style={{ margin: 20, marginTop: 10 }}>
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}>
            Tell Donors Why Are You Raising Funds
          </Text>
          <Text>{userData?.requestingDonation}</Text>
        </View>
        <Button title={"Share Profile"} colors={"blueGradient"} />
      </SafeAreaView>
    );
  } else if (loading) {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={"black"} size="large" />
      </View>
    );
  }

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior="position"
          enabled={keyBoardView}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Header title="Profile Details" navigation={props.navigation} />
          <View
            style={{
              marginTop: 40,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                marginLeft: 8,
                marginBottom: 8,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Add Your photo
            </Text>
            <View
              style={{
                borderRadius: 20,
                borderColor: "#999999",
                borderWidth: 1,
                padding: 40,
              }}
            >
              {image ? (
                <Image
                  source={{ uri: image?.uri }}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
              ) : (
                <Image
                  source={require("./../../../assets/icons/MaleUser.png")}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
              )}
              {
                <TouchableOpacity onPress={() => pickImage()}>
                  <AntDesign
                    style={{ alignItems: "center", alignSelf: "center" }}
                    color="grey"
                    name="picture"
                    size={28}
                  />
                </TouchableOpacity>
              }
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              mode="flat"
              label="First Name"
              value={firstName}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(firstName) => setFirstName(firstName)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
                width: 150,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
            <TextInput
              label="Last Name"
              value={lastName}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(lastName) => setLastName(lastName)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
                width: 150,
                marginLeft: 30,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                marginLeft: 8,
                marginBottom: 8,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Donation Title
            </Text>
            <TextInput
              label="Give your donation a title..."
              value={donationTitle}
              // left={<TextInput.Affix text={'+'} />}
              onChangeText={(donationTitle) => setDonationTitle(donationTitle)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                marginLeft: 8,
                marginBottom: 8,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Why are you requesting donation?
            </Text>
            <TextInput
              label="Why are you requesting donation?"
              value={requestDonation}
              // left={<TextInput.Affix text={'+'} />}
              onFocus={() => {
                setKeyBoardView(true);
              }}
              onBlur={() => {
                setKeyBoardView(false);
              }}
              onChangeText={(requestDonation) =>
                setRequestDonation(requestDonation)
              }
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                fontSize: 14,
                borderColor: "#999999",
                borderWidth: 1,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 20,
                fonts: {
                  regular: { fontFamily: "Poppins_500Medium", color: "black" },
                },
                colors: {
                  placeholder: "#999999",
                  text: "black",
                  primary: "black",
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                marginLeft: 8,
                marginBottom: 8,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Select Merchant
            </Text>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton.Android
                  color="black"
                  value="Wallmart"
                  status={
                    recipientChoice === "Wallmart" ? "checked" : "unchecked"
                  }
                  onPress={() => setRecipientChoice("Wallmart")}
                />
                <Text style={{ fontSize: 16, color: "#999999" }}>Wallmart</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        <Button
          title={"Continue"}
          colors={"blueGradient"}
          onHandlePress={() => {
            // props.navigation.navigate('ProductCategory')
            onSubmit();
          }}
        />
      </ScrollView>
      {/* </BorderBackground> */}
    </SafeAreaView>
  );
};

export default RecipientProfile;
