import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../Screens/ExploreScreen';
import ProductDetailScreen from '../Screens/ProductDetailScreen';

const Stack = createStackNavigator();
export default function ExploreScreenStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen}   options={() => ({
          title: "Product Detail",
          headerStyle: {
            backgroundColor: '#1172b1',
            shadowColor: 'transparent',
          },
          headerTintColor: '#fff',
        })}/>
    </Stack.Navigator>
  )
}