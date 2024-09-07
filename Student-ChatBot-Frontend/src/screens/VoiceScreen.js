import React, { useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const VoiceScreen = () => {
  const [messages, setMessages] = useState([]);

  // Load initial message
  useState(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome! Please enter the city name to get information about polytechnic colleges.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
    ]);
  }, []);

  // Handle sending message
  const onSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const userMessage = newMessages[0].text;

    try {
      const response = await axios.post('http://192.168.31.130:5001/chats', { message: userMessage });
      const botResponse = response.data.data;

      const botMessage = {
        _id: Math.random().toString(),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
    } catch (error) {
      console.error("Error fetching response from Gemini", error);
      const botErrorMessage = {
        _id: Math.random().toString(),
        text: "Sorry, I couldn't find any polytechnic colleges in that city.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botErrorMessage]));
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default VoiceScreen;
