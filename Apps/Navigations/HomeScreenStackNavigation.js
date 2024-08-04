import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemListByCategory';
import Header from '../Components/HomeComponents/Header';
import ProductDetailScreen from '../Screens/ProductDetailScreen';

const Stack = createStackNavigator();

export default function HomeScreenStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>

      <Stack.Screen 
        name="SearchResult" 
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

      <Stack.Screen 
        name="ItemList" 
        component={ItemList} 
        options={({route}) => ({
          title: route.params.category,
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
    </Stack.Navigator>
  )
}