import { View } from "react-native";
import backButton from "../components/backButton";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import React, { useState, useEffect } from "react";
import { Image as ExpoImage } from 'expo-image';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load initial messages (if any) from your database or API
    setMessages([
      {
        _id: 1,
        text: "Welcome! Please enter the city name to get information about polytechnic colleges.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
        image:
          "https://cms.imgworlds.com/assets/e3873302-212a-4c3a-aab3-c3bee866903c.jpg?key=home-gallery",
      },
    ]);
  }, []);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setLoading(true);
    // Send the new message to your API
    try {
      const response = await fetch("http://192.168.31.130:5001/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessages[0].text }),
      });
      const data = await response.json();
      if (data.status === "Ok") {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random().toString(36).substring(7),
              text: data.data,
              createdAt: new Date(),
              user: {
                _id: 2, // Bot's ID
                name: "Bot",
                avatar: "https://placehold.co/60", // Optional: Bot's avatar
              },
              image: data.dataImg
            },
          ])
        );
        // console.log(data.dataImg);
        setLoading(false);
      } else {
        console.error("Error sending message:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    return (
      <ExpoImage
        source={{ uri: currentMessage.image }}
        className="w-50 h-40 rounded-lg m-2"
      />
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* <backButton /> */}
      <GiftedChat
        statusBarTranslucent={false}
        messages={messages}
        onSend={onSend}
        isTyping={loading}
        // renderSend={(props) => (
        //   <View>
        //     <Image
        //       source={require("../assets/image/google.png")}
        //       style={{ width: 40, height: 40 }}
        //     />
        //   </View>
        // )}
        // renderMessageImage={(props) => (
        //   <Image
        //     source={{ uri: props.currentMessage.image }}
        //     // style={{ width: 200, height: 200 , borderRadius: 10 }}
        //     className="w-40 h-40 rounded-lg"
        //   />
        // )}
        renderMessageImage={renderMessageImage}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "orange",
                },
              }}
            />
          );
        }}
        user={{
          _id: 1, // User's ID
          name: "User",
          avatar: "https://placehold.co/60", // Optional: User's avatar
        }}
      />
    </View>
  );
};

export default ChatScreen;
