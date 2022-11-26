import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import DonorView from "../../Components/DonorView";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { selectedCategory } from "../../actions/user";
import Header from "../../Components/Header";
import BorderBackground from "../../Components/BorderBackground";

const images = [
  {
    url: require("./../../../assets/icons/i1.png"),
  },
  {
    url: require("./../../../assets/icons/i2.png"),
  },
  {
    url: require("./../../../assets/icons/i3.png"),
  },
  {
    url: require("./../../../assets/icons/i4.png"),
  },
  {
    url: require("./../../../assets/icons/i5.png"),
  },
  {
    url: require("./../../../assets/icons/i6.png"),
  },
  {
    url: require("./../../../assets/icons/i7.png"),
  },
];

const ProductCategory = (props) => {
  const dispatch = useDispatch();
  const [categoriesData, setCategoriesData] = useState();
  const [loader, setLoader] = useState(false);
  let selectedUser = useSelector((state) => state.auth.selectedUser);
  let category = useSelector((state) => state.user.selectedCategory);

  const getProductCategories = async () => {
    setLoader(true);
    await api({
      method: "GET",
      url: "/categories",
    })
      .then((res) => {
        console.log(res.data);
        setCategoriesData(res.data.categories);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const selectCategory = (id) => {
    var filteredData = [...categoriesData];
    filteredData.map((val) => {
      if (val._id == id) {
        val.selected = true;
      } else {
        val.selected = false;
      }
    });
    var category = filteredData.find((x) => x.selected === true);
    dispatch(selectedCategory(category));
    setCategoriesData(filteredData);
  };

  useEffect(() => {
    getProductCategories();
  }, []);

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
  console.log(selectedUser);
  if (loader) {
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
      }}
    >
      {/* <BorderBackground> */}
      <Header title={"Categories"} navigation={props.navigation} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 20 }}>
          {categoriesData &&
            categoriesData.map((val, index) => {
              return (
                <TouchableOpacity
                  key={val._id}
                  onPress={() => selectCategory(val._id)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "white",
                    margin: 10,
                    padding: 10,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  <RadioButton.Android
                    color="black"
                    status={val.selected ? "checked" : "unchecked"}
                  />
                  <Image
                    source={images[index].url}
                    style={{ width: 25, height: 25, resizeMode: "contain" }}
                  />
                  <Text style={{ fontFamily: "Poppins_500Medium" }}>
                    {val.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
        <View>
          <View style={{ alignItems: "flex-end", marginRight: 10 }}>
            <TouchableOpacity
              disabled={category == undefined || null ? true : false}
              onPress={() => props.navigation.navigate("AddToCart")}
              style={
                category == undefined || null
                  ? styles.disableBtnStyle
                  : styles.btnStyle
              }
            >
              <AntDesign
                name="arrowright"
                color={category == undefined || null ? "grey" : "#150E68"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* </BorderBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  btnStyle: {
    width: 100,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    margin: 10,
    borderWidth: 1,
    borderColor: "#150E68",
    alignItems: "center",
  },
  disableBtnStyle: {
    width: 100,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
  },
});

export default ProductCategory;
