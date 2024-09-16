import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

const PanalScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <TouchableOpacity className="bg-gray-300 rounded-full h-10 w-10 justify-center items-center">
        <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
      </TouchableOpacity>
      <View className="my-5">
        <Text className="text-3xl text-primary font-semibold">Hey,</Text>
        <Text className="text-3xl text-primary font-semibold">Welcome</Text>
      </View>
      <View className='justify-center items-center'>
        <LottieView
          source={require("../assets/lottie/1.json")}
          style={{ width: width - 20, height: height / 2 }}
          autoPlay
          loop
        />
      </View>
      <View>

      </View>
    </SafeAreaView>
  );
};

export default PanalScreen;
