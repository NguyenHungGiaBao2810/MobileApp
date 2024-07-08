import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../asset/Loading.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Loading;