import {View, Text, TextInput} from 'react-native';
import React from 'react';

const Input = ({
  title,
  placeholder,
  keyboard,
  is_password,
  value,
  setValue,
}) => {
  return (
    <View style={{marginVertical: 10}}>
      <Text style={{fontSize: 16, color: '#000'}}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="lightgray"
        value={value}
        onChangeText={val => setValue(val)}
        style={{
          borderBottomColor: '#252525',
          borderBottomWidth: 1,
          paddingVertical: 10,
          marginTop: 5,
          color: '#252525',
        }}
        secureTextEntry={is_password}
        keyboardType={keyboard}
      />
    </View>
  );
};

export default Input;
