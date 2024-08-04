import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNavigation from './HomeScreenStackNavigation';
import ExploreScreenStackNavigation from './ExploreScreenStackNavigation';
import MyProfileStackNavigation from './MyProfileStackNavigation';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen 
          name="home" 
          component={HomeScreenStackNavigation} 
          options={{
            tabBarLabel:({color})=> <Text style={{color:color, fontSize:16, marginBottom:3}}>Home</Text>,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="explore" 
          component={ExploreScreenStackNavigation} 
          options={{
            tabBarLabel:({color})=> <Text style={{color:color, fontSize:16, marginBottom:3}}>Explore</Text>,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="addPost" 
          component={AddPostScreen} 
          options={{
            tabBarLabel:({color})=> <Text style={{color:color, fontSize:16, marginBottom:3}}>Add Post</Text>,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="profile" 
          component={MyProfileStackNavigation} 
          options={{
            tabBarLabel:({color})=> <Text style={{color:color, fontSize:16, marginBottom:3}}>Profile</Text>,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
    </Tab.Navigator>
  )
}