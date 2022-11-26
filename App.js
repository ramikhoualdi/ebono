import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { loadUser } from "./src/actions/auth";
import Routes from "./src/Screens/Routes/routes";
import { StripeProvider } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import Welcome from "./src/Screens/Welcome";
import store from "./src/store";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import DonorForm from "./src/Screens/DonorForm";

export default function App() {
  const [displaySplash, setDisplaySplash] = useState(true);
  const publishableKey =
    "pk_test_51HJecfDK0ioqWXMOfEJ4NVSW2ITUXrOpF1wHQVZqlAmSXQuNPMEVFu03aXP5YcRHMNR2cXZlpij33mrd8nqtQVMl00AlyFoJdd";

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    renderSplash();
  }, []);

  const renderSplash = () => {
    setTimeout(() => {
      setDisplaySplash(false);
    }, 4000);
  };
  return (
    displaySplash ? <Welcome /> :
      <StripeProvider
        publishableKey={publishableKey}
      >
        <Provider store={store}>
          <Routes />
          <Toast />
        </Provider>
      </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
