import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  LoginScreen,
  SignUpScreen,
  OnboardingScreen,
  ChatScreen,
  ProfileScreen,
} from "../screens";
import { useEffect , useState} from "react";
import { getItem } from "../utils/asyncStorage";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  const handleOnboarding = async () => {
    let onboarding = await getItem("onboarding");
    if (onboarding == 1) {
      //hide onboarding
      setShowOnboarding(false);
    }else {
      //show onboarding
      setShowOnboarding(true);
    }
  }

  useEffect(() => {
      handleOnboarding();
      //console.log("showOnboarding", showOnboarding); //for testing
  },[]);

  if (showOnboarding == null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
      //initialRouteName={showOnboarding ? 'Login' : 'Onboarding'} //this for Onboarding only once time showing
       initialRouteName="Login" //this for testing
      >
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Chat"
          options={{ headerShown: false }}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
