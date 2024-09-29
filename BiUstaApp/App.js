
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen'; 
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';
import ResultsShowScreen from './screens/ResultsShowScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ title: 'Arama' }} 
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ title: 'Harita' }} 
        />
        <Stack.Screen 
        name="ResultsShow"
        component={ResultsShowScreen} 
        options={{ title: 'Dükkan Detayları' }} 
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
