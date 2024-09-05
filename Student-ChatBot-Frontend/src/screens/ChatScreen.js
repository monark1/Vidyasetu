import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load initial messages (if any) from your database or API
  }, []);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    // Send the new message to your API
    try {
      const response = await fetch('http://192.168.31.130:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessages[0].text }),
      });

      const data = await response.json();
      if (data.status === 'Ok') {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [
          {
            _id: Math.random().toString(36).substring(7),
            text: data.data,
            createdAt: new Date(),
            user: {
              _id: 2, // Bot's ID
              name: 'Bot',
              avatar: 'https://placehold.co/60', // Optional: Bot's avatar
            },
          },
        ]));
      } else {
        console.error('Error sending message:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1, // User's ID
        name: 'User',
        avatar: 'https://placehold.co/60', // Optional: User's avatar
      }}
    />
  );
};

export default ChatScreen;