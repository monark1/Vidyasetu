import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 p-2 bg-white">
      <View className="flex-row justify-between">
        <TouchableOpacity className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center ml-3 ">
          <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold text-primary text-center">
          Profile
        </Text>
        <TouchableOpacity className="h-10 w-10 bg-gray-300 rounded-full justify-center items-center mr-3">
          <FontAwesome5 name="user-edit" size={24} color="#45484A" />
        </TouchableOpacity>
      </View>
      <View className="items-center mt-8">
        <Image
          source={require("../assets/image/profile.png")}
          className="h-40 w-40 rounded-full"
        />
        <Text className="text-xl font-semibold mt-2">John Doe</Text>
      </View>
      <View className=" gap-y-5 mt-5">
        <View className="border border-secondary rounded-2xl px-5 py-3 flex-row items-center">
          <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
          <Text className="flex-1 text-primary font-semibold px-2.5">
            Name :
          </Text>
        </View>
        <View className="border border-secondary rounded-2xl px-5 py-3 flex-row items-center">
          <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
          <Text className="flex-1 text-primary font-semibold px-2.5">
            Email :
          </Text>
        </View>
        <View className="border border-secondary rounded-2xl px-5 py-3 flex-row items-center">
          <Ionicons name="mail-outline" size={24} color="#AEB5BB" />
          <Text className="flex-1 text-primary font-semibold px-2.5">
            Phone No :
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity className="bg-primary rounded-2xl py-3 mt-5">
          <Text className="text-white text-center font-bold">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
