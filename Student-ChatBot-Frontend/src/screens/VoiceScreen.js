import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';

const VoiceScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load initial messages (if any)
    
  }, []);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    try {
      const response = await axios.post('http://192.168.31.130:5001/chat', {
        message: newMessages[0].text // Pass the user's message to the API
      });

      if (response.status === 200) {
        const polytechnicData = response.data.data.map((college) => ({
          name: college.name,
          place: college.place,
          fee: college.fee,
          branches: college.branches.join(', '), // Assuming branches is an array
          image: college.image
        }));

        setMessages((previousMessages) => GiftedChat.append(previousMessages, [
          // Display relevant college details
          ...polytechnicData.map((college) => ({
            _id: Math.random().toString(36).substring(7),
            text: `- ${college.name} (Place: ${college.place}, Fee: ${college.fee}, Branches: ${college.branches})\n${college.image ? `Image: ${college.image}` : ''}`,
            createdAt: new Date(),
            user: { _id: 2, name: 'Bot', avatar: 'https://placehold.co/60' },
          })),
        ]));
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{ _id: 1, name: 'User', avatar: 'https://placehold.co/60' }}
    />
  );
};

const styles = StyleSheet.create({
  // ... styles for your app if needed
});

export default VoiceScreen;