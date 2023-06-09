import {View, Text, ScrollView, Modal, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from '../components/UserCard';
import axios from 'axios';
import Input from '../components/Input';
import * as EmailValidator from 'email-validator';

const AdminHome = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [edituserName, setEdituserName] = useState(null);
  const [edituserEmail, setEdituserEmail] = useState(null);
  const [edituserId, setEdituserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //   {id: 1, username: 'John', email: 'john@example.com'},
  //     {id: 2, username: 'Jane', email: 'jane@example.com'},
  //     {id: 3, username: 'John', email: 'john@example.com'},
  //     {id: 4, username: 'Jane', email: 'jane@example.com'},

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const {data} = await axios.get(
        `https://af31-111-88-112-171.ap.ngrok.io/allusers`,
      );
      setUsers(data.filter(item => item.isadmin !== true));
      console.log(users);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleEdit = user => {
    setShowModal(!showModal);
    setEdituserEmail(user.email)
    setEdituserName(user.username)
    setEdituserId(user._id)
    // Logic for editing user with the given userId
    console.log(`Edit user with id: ${user._id}`);
  };

  const handleDelete = async userId => {
    try {
      const {data} = await axios.delete(
        `https://af31-111-88-112-171.ap.ngrok.io/deleteuser/${userId}`,
      );
      alert(`User with id "${userId}" deleted`);
      setUsers(users.filter(item => item._id !== userId));
      console.log(data);
    } catch (e) {
      alert(e.message);
    }
    // Logic for deleting user with the given userId
    console.log(`Delete user with id: ${userId}`);
  };

  const save = async () => {
        const usernameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

    if (edituserName.trim() === '') {
      alert('Username can not be empty.');
      return;
    } else if (!usernameRegex.test(edituserName)) {
      alert('Username must only contain alphabets.');
      return;
    }

    if (edituserEmail.trim() === '') {
      alert('Email can not be empty.');
      return;
    } else if (!EmailValidator.validate(edituserEmail)) {
      alert('Please enter a valid email address');
      return;
    }
        try {
          const { data } = await axios.put(
            `https://af31-111-88-112-171.ap.ngrok.io/edituser/${edituserId}`,
            {
                email: edituserEmail.charAt(0).toLowerCase() + edituserEmail.slice(1),
                username: edituserName
            }
          );
          alert(`User with id "${edituserId}" edited`);
          setUsers(
            users.map((item) => {
              return item._id == edituserId ? data : item;
            })
          );
          console.log(data);
        } catch (e) {
          alert(e.message);
        }
    
        setShowModal(false);
      };

  const logout = () => {
    AsyncStorage.clear();
    navigation.replace('Login');
  };
  return (
    <ScrollView>
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
          Welcome Admin 🎉
        </Text>
        <UserCard users={users} onEdit={handleEdit} onDelete={handleDelete} />


        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={() => {
            setShowModal(false);
          }}>
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
                EDIT USER
              </Text>
              <Input
                title="Username"
                placeholder="John Doe"
                keyboard="default"
                value={edituserName}
                setValue={setEdituserName}
              />
              <Input
                title="Email"
                placeholder="john.doe@gmail.com"
                keyboard="email-address"
                value={edituserEmail}
                setValue={setEdituserEmail}
              />
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
                <Text style={{color: 'white', fontSize: 19}} onPress={save}>
                  SAVE
                </Text>
              </LinearGradient>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default AdminHome;
