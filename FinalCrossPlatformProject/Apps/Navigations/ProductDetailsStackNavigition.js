import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailScreen from '../Screens/ProductDetailScreen';
import EditPostScreen from '../Screens/EditPostScreen';
import AddPostScreen from '../Screens/AddPostScreen';

const Stack = createNativeStackNavigator();

export default function ProductDetailsStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
    </Stack.Navigator>
  );
}