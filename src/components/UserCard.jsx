import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const UserCard = ({users, onEdit, onDelete}) => {
  console.log(users);
  return (
    <View>
      {users.length == 0 ? (
        <Text
          style={{
            color: '#000',
            marginTop: 100,
            fontSize: 18,
            fontStyle: 'italic',
            textAlign:"center"
          }}>
          No User Found
        </Text>
      ) : (
        users.map(user => (
          <View style={styles.card} key={user._id}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(user)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(user._id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#252525',
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
    color: 'gray',
  },
  editButton: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserCard;
