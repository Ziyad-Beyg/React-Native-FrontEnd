import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    get_email();
  }, []);

  const get_email = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      if (user.isadmin == true) {
        navigation.replace('AdminHome');
      } else {
        navigation.replace('UserHome');
      }
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
