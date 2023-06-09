import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import UserHome from './src/pages/UserHome';
import Splash from './src/pages/Splash';
import AdminHome from './src/pages/AdminHome';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
