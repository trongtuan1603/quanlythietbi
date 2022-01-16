import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {avatar} from '../asset/images';
import * as Styles from '../styles';

const Account = () => {
  const user = useSelector(state => state.user);
  const logOut = useDispatch();
  const handleLogOut = () => {
    logOut({type: 'LOGOUT', action: null});
  };
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.profilePic} />
      <Text style={styles.txtname}>{user.name}</Text>
      {user.id ? (
        <TouchableOpacity style={styles.btnLogOut} onPress={handleLogOut}>
          <Text style={styles.btnText}>Đăng xuất</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default Account;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: Styles.COLORS.mainColor,
    marginTop: 30,
  },
  btnLogOut: {
    backgroundColor: Styles.COLORS.mainColor,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 100,
  },
  btnText: {
    color: 'white',
  },
  txtname: {
    fontSize: 20
  }
});
