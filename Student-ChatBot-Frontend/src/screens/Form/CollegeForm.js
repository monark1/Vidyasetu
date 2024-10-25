import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  Button,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Formik, FieldArray } from "formik";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios'

const CollegeForm = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }

  const initialFormValues = {
    college: [
      {
        name: "",
        code: "",
        location: "",
        departments: "",
        website: "",
        email: "",
        phone: "",
        person: "",
        facilities: "",
        courses: [
          {
            name: "",
            duration: "",
            branches: [
              {
                name: "",
                fee: "",
                placements: "",
                scholarship: "",
                facilities: "",
              },
            ]
          },
        ],
      },
    ]
  }

  const handleSubmit = async (values) => {
    console.log(values);
    axios
    .post("http://192.168.83.252:5001/collegeform", values)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "Ok") {
        Alert.alert("College Form Submitted", "Thank you for submitting the form");
        // navigation.navigate("CollegeLogin");
      } else {
        Alert.alert("College Form Not Submitted", JSON.stringify(res.data));
      }
    })
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <ScrollView className='p-4 bg-white'>

            <View className='flex-row item-center justify-start absolute'>
              <TouchableOpacity className='bg-gray-300 h-10 w-10 rounded-full justify-center items-center' onPress={handleGoBack}>
                <Ionicons name="arrow-back-outline" size={32} color="#45484A" />
              </TouchableOpacity>
            </View>
            <Text className='text-2xl font-semibold text-center'>College Form</Text>

            <FieldArray name='college'>
              {({ push, remove }) => (
                <>
                  {values.college.map((college, index) => (
                    <View className='p-4' key={index}>
                      <Text className='text-lg font-bold text-center'>College Details</Text>

                      <Text className='text-lg font-bold'>College Name</Text>
                      <TextInput
                        placeholder='Enter College Name'
                        className='border-b border-gray-400 mb-4'
                        value={college.name}
                        onChangeText={handleChange(`college[${index}].name`)}
                      />

                      <Text className='text-lg font-bold'>College Code</Text>
                      <TextInput
                        placeholder='Enter College Code'
                        className='border-b border-gray-400 mb-4'
                        value={college.code}
                        onChangeText={handleChange(`college[${index}].code`)}
                      />

                      <Text className='text-lg font-bold'>Location</Text>
                      <TextInput
                        placeholder='Enter College Location'
                        className='border-b border-gray-400 mb-4'
                        value={college.location}
                        onChangeText={handleChange(`college[${index}].location`)}
                      />

                      <Text className='text-lg font-bold'>Departments</Text>
                      <TextInput
                        placeholder='Enter College Departments'
                        className='border-b border-gray-400 mb-4'
                        value={college.departments}
                        onChangeText={handleChange(`college[${index}].departments`)}
                      />

                      <Text className='text-lg font-bold'>College Website</Text>
                      <TextInput
                        placeholder='Enter College Website'
                        className='border-b border-gray-400 mb-4'
                        value={college.website}
                        onChangeText={handleChange(`college[${index}].website`)}
                      />

                      <Text className='text-lg font-bold'>College Email</Text>
                      <TextInput
                        placeholder='Enter College Email'
                        className='border-b border-gray-400 mb-4'
                        value={college.email}
                        onChangeText={handleChange(`college[${index}].email`)}
                      />

                      <Text className='text-lg font-bold'>College Phone</Text>
                      <TextInput
                        placeholder='Enter College Phone'
                        className='border-b border-gray-400 mb-4'
                        value={college.phone}
                        onChangeText={handleChange(`college[${index}].phone`)}
                      />

                      <Text className='text-lg font-bold'>College Person</Text>
                      <TextInput
                        placeholder='Enter College Person'
                        className='border-b border-gray-400 mb-4'
                        value={college.person}
                        onChangeText={handleChange(`college[${index}].person`)}
                      />

                      <Text className='text-lg font-bold'>College Facilities</Text>
                      <TextInput
                        placeholder='Enter College Facilities'
                        className='border-b border-gray-400 mb-4'
                        value={college.facilities}
                        onChangeText={handleChange(`college[${index}].facilities`)}
                      />

                      <FieldArray name={`college[${index}].courses`}>
                        {({ push: pushCourse, remove: removeCourse }) => (
                          <>
                            {college.courses.map((course, courseIndex) => (
                              <View key={courseIndex}>
                                <Text className='text-lg font-bold text-center'>Courses Details {courseIndex + 1}</Text>
                                <Text className='text-lg font-bold'>Course Name</Text>
                                <TextInput
                                  placeholder='Enter Course Name'
                                  className='border-b border-gray-400 mb-4'
                                  value={course.name}
                                  onChangeText={handleChange(`college[${index}].courses[${courseIndex}].name`)}
                                />

                                <Text className='text-lg font-bold'>Course Duration</Text>
                                <TextInput
                                  placeholder='Enter Course Duration'
                                  className='border-b border-gray-400 mb-4'
                                  value={course.duration}
                                  onChangeText={handleChange(`college[${index}].courses[${courseIndex}].duration`)}
                                />

                                <FieldArray name={`college[${index}].courses[${courseIndex}].branches`}>
                                  {({ push: pushBranch, remove: removeBranch }) => (
                                    <>
                                      {course.branches.map((branch, branchIndex) => (
                                        <View key={branchIndex}>
                                          <Text className='text-lg font-bold text-center'>Branches Details {branchIndex + 1}</Text>
                                          <Text className='text-lg font-bold'>Branch Name</Text>
                                          <TextInput
                                            placeholder='Enter Branch Name'
                                            className='border-b border-gray-400 mb-4'
                                            value={branch.name}
                                            onChangeText={handleChange(`college[${index}].courses[${courseIndex}].branches[${branchIndex}].name`)}
                                          />

                                          <Text className='text-lg font-bold'>Branch Fee</Text>
                                          <TextInput
                                            placeholder='Enter Branch Fee'
                                            className='border-b border-gray-400 mb-4'
                                            value={branch.fee}
                                            onChangeText={handleChange(`college[${index}].courses[${courseIndex}].branches[${branchIndex}].fee`)}
                                          />

                                          <Text className='text-lg font-bold'>Branch Placements</Text>
                                          <TextInput
                                            placeholder='Enter Branch Placements'
                                            className='border-b border-gray-400 mb-4'
                                            value={branch.placements}
                                            onChangeText={handleChange(`college[${index}].courses[${courseIndex}].branches[${branchIndex}].placements`)}
                                          />

                                          <Text className='text-lg font-bold'>Branch Scholarship</Text>
                                          <TextInput
                                            placeholder='Enter Branch Scholarship'
                                            className='border-b border-gray-400 mb-4'
                                            value={branch.scholarship}
                                            onChangeText={handleChange(`college[${index}].courses[${courseIndex}].branches[${branchIndex}].scholarship`)}
                                          />

                                          <Text className='text-lg font-bold'>Branch Facilities</Text>
                                          <TextInput
                                            placeholder='Enter Branch Facilities'
                                            className='border-b border-gray-400 mb-4'
                                            value={branch.facilities}
                                            onChangeText={handleChange(`college[${index}].courses[${courseIndex}].branches[${branchIndex}].facilities`)}
                                          />
                                        </View>
                                      ))}
                                      <TouchableOpacity className='bg-primary p-2 rounded-full mb-[2%]' onPress={() => pushBranch({
                                        name: "",
                                        fee: "",
                                        placements: "",
                                        scholarship: "",
                                        facilities: "",
                                      })}>
                                        <Text className='text-white text-center'>Add Branch</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity className='bg-red-500 p-2 rounded-full mb-[2%]' onPress={() => removeBranch(index)}>
                                        <Text className='text-white text-center'>Remove Branch</Text>
                                      </TouchableOpacity>
                                    </>
                                  )}
                                </FieldArray>

                              </View>
                            ))}

                            <TouchableOpacity className='bg-primary p-2 rounded-full mb-[2%]' onPress={() => pushCourse({
                              name: "",
                              duration: "",
                              branches: [
                                {
                                  name: "",
                                  fee: "",
                                  placements: "",
                                  scholarship: "",
                                  facilities: "",
                                },
                              ]
                            })}>
                              <Text className='text-white text-center'>Add Course</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-red-500 p-2 rounded-full mb-[2%]' onPress={() => removeCourse(index)}>
                              <Text className='text-white text-center'>Remove Course</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </FieldArray>
                    </View>
                  ))}
                </>
              )}
            </FieldArray>

            <TouchableOpacity className='bg-blue-500 p-4 rounded-full mb-[10%]' onPress={handleSubmit}>
              <Text className='text-white text-center'>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  )
}

export default CollegeForm;
