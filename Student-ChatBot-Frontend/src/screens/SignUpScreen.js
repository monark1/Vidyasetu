import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, SimpleLineIcons , AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {useNavigation} from '@react-navigation/native'
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const SignUpScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <TouchableOpacity className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center" onPress={handleGoBack}>
        <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
      </TouchableOpacity>
      <View className="my-5">
        <Text className="text-3xl font-semibold text-primary">Let's Get</Text>
        <Text className="text-3xl font-semibold text-primary">Started</Text>
        <LottieView
          source={require("../assets/lottie/8.json")}
          className="absolute"
          style={{
            width: width * 0.6,
            height: width * 1,
            top: height / 2 - width * 1.5,
            right: height / 2 - width * 1.05,
          }}
          autoPlay
          loop
        />
      </View>
      {/* form */}
      <View className="mt-5">
      <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
          <AntDesign name="user" size={24} color="#AEB5BB" />
          <TextInput
            className="flex-1 text-secondary px-2.5 font-light"
            placeholder="Enter Your username"
          />
        </View>
        <View className="border border-secondary rounded-2xl px-5 py-0.5 flex-row items-center my-4">
          <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
          <TextInput
            className="flex-1 text-secondary px-2.5 font-light"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
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
        <TouchableOpacity className="bg-primary rounded-full mt-5">
          <Text className="text-white text-2xl font-semibold text-center p-2.5">
            Login
          </Text>
        </TouchableOpacity>
        <Text className="text-center my-5 text-lg text-primary">
          or continue with
        </Text>
        <TouchableOpacity
          className="flex-row border-2 border-primary rounded-full justify-center items-center p-2.5 gap-2.5"
        >
          <Image
            source={require("../assets/image/google.png")}
            className="h-5 w-5"
          />
          <Text className="font-semibold text-xl">Google</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center my-10 gap-x-1">
          <Text className="text-primary font-normal">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text className="text-primary font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
