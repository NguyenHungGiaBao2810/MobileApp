import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ContactListItem, ContactInfo } from '../components/ContactListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../router/RootStackParamList';

type MessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Mess'>;

const Mess = () => {
  const [contacts, setContacts] = useState<ContactInfo[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<MessScreenNavigationProp>();

  const contactsPlaceholderList = useMemo(() => {
    return Array.from({ length: 15 }).map((_, index) => ({
      id: index.toString(),
      name: `Contact ${index + 1}`,
      email: `contact${index + 1}@example.com`,
    }));
  }, []);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data: ContactInfo[] = await response.json();
      await new Promise(resolve => setTimeout(resolve, 2000));
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handlePressContact = (contact: ContactInfo) => {
    navigation.navigate('Chat', { contact });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={isLoading ? contactsPlaceholderList : contacts}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, width: '100%', backgroundColor: '#CED0CE' }} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressContact(item)}>
            <ContactListItem contact={item} isLoading={isLoading} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});

export default Mess;