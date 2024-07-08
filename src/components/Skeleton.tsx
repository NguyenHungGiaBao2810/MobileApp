import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Easing } from 'react-native-reanimated';

const Skeleton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const waveAnimation = new Animated.Value(0);

  useEffect(() => {
    if (isLoading) {
      wave();
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const wave = () => {
    waveAnimation.setValue(0);
    Animated.timing(waveAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (isLoading) {
        waveAnimation.setValue(0);
        wave();
      }
    });
  };

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Wave effect */}
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [
              {
                translateX: waveAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-400, 400],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  wave: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#e0e0e0',
  },
});

export default Skeleton;