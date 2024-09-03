import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { removeItem } from "../utils/asyncStorage";


const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const handleGoBack = () => {
    // await removeItem("onboarding");
    navigation.goBack();
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleHomeWithOutLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <TouchableOpacity
        className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center"
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
      </TouchableOpacity>
      <View className="my-5">
        <Text className="text-3xl font-semibold text-primary">Hey ,</Text>
        <Text className="text-3xl font-semibold text-primary">Welcome</Text>
        <Text className="text-3xl font-semibold text-primary">Students</Text>
        <LottieView
          source={require("../assets/lottie/5.json")}
          className="absolute"
          style={{
            width: width * 0.7,
            height: width * 1,
            top: height / 2 - width * 1.4,
            right: height / 2 - width * 1.1,
          }}
          autoPlay
          loop
        />
      </View>
      {/* form */}
      <View className="mt-5">
        {/* Email */}
        <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
          <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
          <TextInput
            className="flex-1 text-secondary px-2.5 font-light"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        {/* Password */}
        <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
          <SimpleLineIcons name="lock" size={24} color="#AEB5BB" />
          <TextInput
            className="flex-1 text-secondary px-2.5 font-light"
            placeholder="Enter your password"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry((prev) => !prev)}>
            <SimpleLineIcons name="eye" size={24} color="#AEB5BB" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="">
          <Text className="text-primary text-right font-semibold my-2.5">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        {/* Login Button */}
        <TouchableOpacity className="bg-primary rounded-full mt-5">
          <Text className="text-white text-2xl font-semibold text-center p-2.5">
            Login
          </Text>
        </TouchableOpacity>
        <Text className="text-center my-5 text-lg text-primary">
          or continue with
        </Text>
        {/* Google Button */}
        <TouchableOpacity className="flex-row border-2 border-primary rounded-full justify-center items-center p-2.5 gap-2.5">
          <Image
            source={require("../assets/image/google.png")}
            className="h-5 w-5"
          />
          <Text className="font-semibold text-xl">Google</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center my-10 gap-x-1">
          <Text className="text-primary font-normal">
            Don't have an account?
          </Text>
          {/* Sign up Button */}
          <TouchableOpacity>
            <Text className="text-primary font-bold" onPress={handleSignUp}>
              Sign up
            </Text>
          </TouchableOpacity>
          {/* Gaust Login */}
        </View>
        <TouchableOpacity
          className="justify-center items-center bg-primary rounded-full mt-5"
          onPress={handleHomeWithOutLogin}
        >
          <Text className="text-white text-2xl font-semibold text-center p-2.5">
            Guest
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
