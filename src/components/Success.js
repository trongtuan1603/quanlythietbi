import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Styles from '../styles/index';

const Success = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="checkmark-outline"
        size={55}
        color={Styles.COLORS.mainColor}
      />
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
});
