import React from 'react';
import { ViewToken, Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeartButton from '../components/HeartButton';
type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
    title: string;
    body: string;
  };
};

const ListItem: React.FC<ListItemProps> = React.memo(
  ({ item, viewableItems }) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((viewableItem) => viewableItem.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 1.25),
          },
        ],
      };
    }, [viewableItems]);

    const handleCommentPress = () => {
      console.log('Commented!');
    };

    const handleSharePress = () => {
      console.log('Shared!');
    };

    return (
      <Animated.View style={[styles.card, rStyle]}>
        <Image
          source={{ uri: `https://picsum.photos/id/${item.id}/300/300` }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
          <View style={styles.actions}>
            <HeartButton onPress={() => console.log('Liked!')} />
            <TouchableOpacity style={styles.actionButton} onPress={handleCommentPress}>
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSharePress}>
              <Ionicons name="share-outline" size={24} color="black" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 8,
  },
});

export { ListItem };