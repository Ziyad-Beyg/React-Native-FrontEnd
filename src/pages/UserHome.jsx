import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const UserHome = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect( () => {
    getUser()
  }, []);

  const getUser = async() => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setCurrentUser(user);
  }

  const logout = () => {
    AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <View>
      <LinearGradient
        onPress={() => {}}
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          width: '100%',
          alignSelf: 'center',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingVertical: 25,
          marginBottom: 10,
          paddingRight: 25,
        }}>
        <Text
          style={{color: 'white', fontSize: 14, textAlign: 'right'}}
          onPress={logout}>
          Logout
        </Text>
      </LinearGradient>

      <Text
        style={{
          marginVertical: 40,
          marginHorizontal: 20,
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'left',
          marginVertical: 20,
          paddingBottom: 10,
          color: 'black',
          borderColor: 'lightgray',
          borderBottomWidth: 0.5,
        }}>
        Welcome {currentUser?.username} 🎉
      </Text>
    </View>
  );
};

export default UserHome;
