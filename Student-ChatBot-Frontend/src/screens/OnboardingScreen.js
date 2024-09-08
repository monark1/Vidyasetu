import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { setItem } from "../utils/asyncStorage";
import { COLORS } from "../theme/theme";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleLogin = async () => {
    // await setItem("onboarding", "1");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onSkip={handleLogin}
        onDone={handleLogin}
        controlStatusBar={true}
        pages={[
          {
            backgroundColor: "#AFDBF5",
            image: (
              <LottieView
                source={require("../assets/lottie/4.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Welcome Students",
            subtitle: "ChatBot designed to support students in their learning",
          },
          {
            backgroundColor: "#1da1f2",
            image: (
              <LottieView
                source={require("../assets/lottie/3.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Academic Planner",
            subtitle: "Designed to help you plan your academic year",
          },
          {
            backgroundColor: "#2D68C4",
            image: (
              <LottieView
                source={require("../assets/lottie/7.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            ),
            title: "Study Material",
            subtitle: "Your Journey to becoming a better student starts here",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 2,
    height: width,
  },
});
