import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

const ViewScreen = () => {
  const [messages, setMessages] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("Hello, Ask Me Anything...");
  const [headerSubtitle, setHeaderSubtitle] = useState("Last Update: 12.02.26"); 
  // ... (Add states for voice input, additional information bubbles, etc.)

  // ... (Your logic for onSend, loading initial messages, etc.)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1, // User's ID
          name: 'User', 
          avatar: 'https://placehold.co/60', // Optional: User's avatar
        }}
        renderInputToolbar={(props) => (
          <View style={styles.inputToolbar}>
            <TouchableOpacity style={styles.microphoneIcon}>
              <FontAwesome5 name="microphone" size={20} color="#000" />
            </TouchableOpacity>
            <TextInput
              {...props}
              style={styles.input}
              placeholder="Ask me anything..."
            />
            <Button title="Send" onPress={props.onSubmit} />
          </View>
        )}
      />
      {/* ... Add additional information bubbles using View components */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e9f1f6', 
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  microphoneIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  // ... Styles for your information bubbles
});

export default ViewScreen;