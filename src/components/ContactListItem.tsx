import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine } from 'react-native-loading-placeholder';
import LoadingAnimation from './LoadingAnimation';


export type ContactInfo = {
  id: any;
  name: string;
  email: string;
};

type ContactListItemProps = {
  contact: ContactInfo;
  isLoading: boolean;
};

const ContactListItem: React.FC<ContactListItemProps> = ({ contact, isLoading }) => {
  if (isLoading) {
    return (
      <LoadingAnimation />
    );
  }
  return (
    <View style={styles.container}>
      {!contact ? (
        <Placeholder style={styles.placeholder}>
          <PlaceholderMedia style={styles.circleContainer} />
          <View style={{ marginLeft: 15 }}>
            <PlaceholderLine style={styles.placeholderText} />
            <View style={{ height: 5 }} />
            <PlaceholderLine style={styles.placeholderText} />
          </View>
        </Placeholder>
      ) : (
        <>
          <View style={styles.circleContainer}>
            <Text style={{ fontSize: 25, color: 'white' }}>
              {contact.name?.[0]}
            </Text>
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 25 }}>{contact.name}</Text>
            <View style={{ height: 5 }} />
            <Text style={{ fontSize: 20 }}>{contact.email}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  circleContainer: {
    height: 70,
    aspectRatio: 1,
    backgroundColor: '#005CB7',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 120,
  },
  placeholderText: {
    height: 20,
    marginBottom: 5,
  },
});

export { ContactListItem };