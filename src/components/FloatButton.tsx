import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const FloatingButton: React.FC = React.memo(() => {
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = useCallback(() => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [icon_1, icon_2, icon_3]);

  const popOut = useCallback(() => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [icon_1, icon_2, icon_3]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity>
          <Icon name="sound" size={25} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2 }]}>
        <TouchableOpacity>
          <Icon name="search1" size={25} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { right: icon_3 }]}>
        <TouchableOpacity>
          <Icon name="setting" size={25} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name="plus" size={25} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#f52d56",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingButton;