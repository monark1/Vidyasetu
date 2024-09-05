import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";

const VoiceScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleAnimation = () => {
    if (isRecording) {
      animation.current.pause();
    } else {
      animation.current.play();
    }
    setIsRecording(!isRecording);
  }
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <TouchableOpacity
        className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center first-letter"
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
      </TouchableOpacity>
      <View className=" justify-center items-center p-10">
        <LottieView
          source={require("../assets/lottie/Voice.json")}
          style={{ width: 300, height: 300 }}
          ref={animation}
          // autoPlay
          // loop
        />
      </View>

      <View className=" justify-center items-center mt-5">
        <Text className="text-3xl font-semibold text-primary text-center">
          Voice Screen
        </Text>
      </View>
      {/* Button */}
      <View className="mt-5 bottom-[-30%]">
        <TouchableOpacity className="bg-primary py-3 rounded-md justify-center items-center"
          onPress={handleAnimation}
        >
          <Text className='text-white text-lg font-semibold'>
            {isRecording ? 'Stop' : 'Ask Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VoiceScreen;
