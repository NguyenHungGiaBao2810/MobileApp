import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../router/RootStackParamList';

type ChatScreenRouteProp = StackNavigationProp<RootStackParamList, 'Chat'> & {
  params: {
    contact: {
      id: string;
      name: string;
    };
  };
};

type Message = {
  id: number;
  text: string;
}

const Chat = ({ route }: { route: ChatScreenRouteProp }) => {
  const { contact } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      setMessages([{ id: Date.now(), text: message }, ...messages]);
      setMessage('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat với {contact.name}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#e1ffc7',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chat;