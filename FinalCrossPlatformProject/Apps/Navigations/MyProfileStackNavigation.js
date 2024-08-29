import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProductListScreen from '../Screens/MyProductListScreen';
import ProductDetailScreen from '../Screens/ProductDetailScreen';
import AddPostScreen from '../Screens/AddPostScreen';

const Stack = createStackNavigator();
export default function MyProfileStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} 
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen name="MyProductList" component={MyProductListScreen} 
       options={() => ({
        title: "My Posts",
        headerStyle: {
          backgroundColor: '#1172b1',
          shadowColor: 'transparent',
          
        },
        headerTintColor: '#fff',
      })}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={() => ({
          title: "Product Detail",
          headerStyle: {
            backgroundColor: '#1172b1',
            shadowColor: 'transparent',
            
          },
          headerTintColor: '#fff',
        })}
      />
       <Stack.Screen name="AddPostScreen" component={AddPostScreen} 
      options={{
        headerShown: false
      }}
      />
    </Stack.Navigator>
  )
}