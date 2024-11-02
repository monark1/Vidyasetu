import { View, Text, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import LottieView from "lottie-react-native";

const CollegeManagement = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className=' items-center justify-between p-3 flex-row'>
        <TouchableOpacity className='w-10 h-10 bg-gray-300 items-center justify-center rounded-full' onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#45484A" />
        </TouchableOpacity>
        <Text className='text-xl font-semibold'>College Management</Text>
        <TouchableOpacity className='w-10 h-10 bg-gray-300 items-center justify-center rounded-full'>
          <Ionicons name="menu" size={32} color="#45484A" />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Text className='text-2xl font-semibold text-center'>College Management</Text>
          <View className='flex-row items-center justify-between p-3'>
            <View className='flex-1 items-center justify-center p-3 bg-gray-100 rounded-lg'>
              <Text className='text-xl font-semibold'>College List</Text>
              <Text className='text-lg font-normal'>List of all colleges</Text>
            </View>
            <View className='flex-1 items-center justify-center p-3 bg-gray-100 rounded-lg'>
              <Text className='text-xl font-semibold'>Add College</Text>
              <Text className='text-lg font-normal'>Add a new college</Text>
            </View>
          </View>
          <View className='flex-row items-center justify-between p-3'>
            <View className='flex-1 items-center justify-center p-3 bg-gray-100 rounded-lg'>
              <Text className='text-xl font-semibold'>College Profile</Text>
              <Text className='text-lg font-normal'>View college profile</Text>
            </View>
            <View className='flex-1 items-center justify-center p-3 bg-gray-100 rounded-lg'>
              <Text className='text-xl font-semibold'>College Report</Text>
              <Text className='text-lg font-normal'>View college report</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CollegeManagement