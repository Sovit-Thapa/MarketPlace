import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/MarketItemStyles'; // Import styles

const { width } = Dimensions.get('window');

export default function MarketItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.push('ProductDetail', { product: item })}
      style={styles.imageContainer}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{"$ " + item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}