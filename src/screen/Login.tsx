import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../router/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Accout: eve.holt@reqres.in

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation<LoginNavigationProp>();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', data);
      const token = response.data.token;
      await AsyncStorage.setItem('token', token); // Lưu token vào AsyncStorage
      console.log('Token:', token);
      navigation.navigate('BottomTab');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
    style={styles.container} 
    behavior='padding'
    keyboardVerticalOffset={Platform.OS === "android" ? 100 : 0}>
      <LottieView
        source={require('../asset/Login.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        {errors.username && <Text style={styles.errorText}>Vui lòng đừng bỏ trống.</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        {errors.password && <Text style={styles.errorText}>Vui lòng đừng bỏ trống.</Text>}

        {/* Button Login */}
        <View style={styles.loginBtnWrapper}>
          <LinearGradient
            colors={['#CC33FF', '#FF3300']}
            style={styles.linearGradient}
            start={{ y: 0.0, x: 0.0 }}
            end={{ y: 1.0, x: 0.0 }}
          >
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        
      </View>

      {/* Sign up */}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}> Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
          <Text style={styles.signupBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    top: 0,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  loginBtnWrapper: {
    height: 55,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  submitButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  forgotPasswordText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
    color: '#FF3366',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: '#666666',
    fontWeight: 'bold',
  },
  signupBtn: {
    color: '#FF3300',
    fontWeight: 'bold',
  },
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 10,
  },
  animation: {
    width: 150,
    height: 150,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Login;
