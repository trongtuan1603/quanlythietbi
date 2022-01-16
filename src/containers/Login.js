import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logo} from '../asset/images';
import * as Styles from '../styles/index';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../helper/index';
import Loading from '../components/Loading';
import Modal from 'react-native-modal';
import { login } from '../api';
import base64 from 'react-native-base64'

const Login = () => {
  const saveUser = useDispatch();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = () => {
    setLoading(true);
    try {
      login(username, password).then((response) => {
        const result = response.data;
        console.log(result)
        setLoading(false);
        if(result.success) {
          const user = {
            id: result.id,
            name: result.name,
          }
          saveUser({type: "LOGIN", user: user })
        }
        else{
          ToastAndroid.showWithGravity(result.message, ToastAndroid.CENTER, ToastAndroid.LONG)
        }
      })
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Modal isVisible={loading}>
        <Loading />
      </Modal>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>ỨNG DỤNG PHẢN HỒI THIẾT BỊ</Text>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Đăng nhập</Text>
          <TextInput 
            value={username} 
            style={styles.input} 
            onChangeText={text => setUsername(text)}
            placeholder="Tên đăng nhập" />
          <TextInput
            value ={password}
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity style={styles.btnLogin} onPress={onLogin}>
            <Text style={{color: 'white'}}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 85,
  },
  logo: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  loginCard: {
    height: 400,
    width: SCREEN_WIDTH - 40,
    marginHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 60,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loginTitle: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: Styles.COLORS.mainColor,
    borderWidth: 0.5,
    marginVertical: 10,
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  btnLogin: {
    backgroundColor: Styles.COLORS.mainColor,
    width: '90%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
});
