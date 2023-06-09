import {View, Text, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import axios from 'axios';
import * as EmailValidator from 'email-validator';

const Signup = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isadmin, setIsAdmin] = useState(false);

  const signup = async () => {
    const usernameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

    if (username.trim() === '') {
      alert('Username can not be empty.');
      return;
    } else if (!usernameRegex.test(username)) {
      alert('Username must only contain alphabets.');
      return;
    }

    if (email.trim() === '') {
      alert('Email can not be empty.');
      return;
    } else if (!EmailValidator.validate(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
    if (password.trim() === '') {
      alert('Password can not be empty.');
      return;
    } else if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    } else if (!passwordRegex.test(password)) {
      alert(
        'Password must contain at least one letter, one number and one special character.',
      );
      return;
    }

    try {
      const {status} = await axios.post(
        `https://af31-111-88-112-171.ap.ngrok.io/register`,
        {
          username,
          email: email.charAt(0).toLowerCase() + email.slice(1),
          password,
          isadmin,
        },
      );
      if (status === 201) {
        alert("User Created Successfully")
        navigation.replace('Login');
      }
    } catch (err) {
      alert( err.message);
    }
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          height: Dimensions.get('window').height * 0.2,
          width: '100%',
          alignItems: 'center',
          paddingTop: 40,
        }}></LinearGradient>
      <View
        style={{
          elevation: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          margin: 10,
          marginTop: -40,
          paddingVertical: 20,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 'bold',
            color: '#252525',
            textAlign: 'center',
            marginBottom: 40,
            letterSpacing: 2,
          }}>
          REGISTER
        </Text>
        <Input
          title="Username"
          placeholder="John Doe"
          keyboard="default"
          value={username}
          setValue={setUserName}
        />
        <Input
          title="Email"
          placeholder="john.doe@gmail.com"
          keyboard="email-address"
          value={email}
          setValue={setEmail}
        />
        <Input
          title="Password"
          placeholder="********"
          keyboard="default"
          is_password={true}
          value={password}
          setValue={setPassword}
        />
        <Text
          style={{
            color: 'lightgray',
            fontSize: 12,
            textAlign: 'left',
            marginTop: 10,
          }}>
          Already have an account?{' '}
          <Text
            style={{color: '#42a1f5'}}
            onPress={() => navigation.replace('Login')}>
            Login
          </Text>
        </Text>
        <LinearGradient
          onPress={() => {}}
          colors={['#42a1f5', '#03bafc', '#42c5f5']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            borderRadius: 100,
            width: 150,
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            marginTop: 50,
            marginBottom: 10,
          }}>
          <Text style={{color: 'white', fontSize: 19}} onPress={signup}>
            SIGNUP
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Signup;
