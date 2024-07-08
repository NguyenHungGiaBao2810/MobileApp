import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

type HeartButtonProps = {
  onPress: () => void;
};

const HeartButton: React.FC<HeartButtonProps> = ({ onPress }) => {
  const [clickCount, setClickCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    setClickCount((prev) => prev + 1);
    onPress();
  };

  useEffect(() => {
    if (clickCount === 2) {
      setIsLiked((prev) => !prev);
      setScale(1.5);
      setTimeout(() => {
        setScale(1);
      }, 200);
      setClickCount(0);
    }

    const timer = setTimeout(() => {
      setClickCount(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [clickCount]);

  const heartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale) }],
    };
  }, [scale]);

  return (
    <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
      <Animated.View style={heartStyle}>
        <Ionicons name="heart" size={24} color={isLiked ? 'red' : 'black'} />
      </Animated.View>
      <Text style={styles.actionText}>Like</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 8,
  },
});

export default HeartButton;