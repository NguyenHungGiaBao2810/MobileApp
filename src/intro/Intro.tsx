import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../router/RootStackParamList';

type IntroNavigationProp = StackNavigationProp<RootStackParamList, 'Intro'>;

const Intro = () => {
  const navigation = useNavigation<IntroNavigationProp>();
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, []);

  const handleAnimationFinish = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../asset/AnikiHamster.json')}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        style={styles.lottie}
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
  lottie: {
    width: 300,
    height: 300,
  },
});

export default Intro;