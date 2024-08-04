import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

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

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: width * 0.05, // Responsive border radius
    width: width * 0.42, // Responsive width
    height: width * 0.60, // Responsive height
    margin: width * 0.02, // Responsive margin
  },
  imageWrapper: {
    flex: 1,
    padding: width * 0.02, // Responsive padding
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: width * 0.05, // Responsive border radius
  },
  image: {
    width: '100%',
    height: width * 0.30, // Responsive height
    borderRadius: width * 0.05, // Responsive border radius
  },
  itemName: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
    marginTop: width * 0.02, // Responsive margin
  },
  itemCategory: {
    backgroundColor: '#aee4ed',
    borderRadius: width * 0.02, // Responsive border radius
    fontSize: width * 0.04, // Responsive font size
    marginTop: width * 0.02, // Responsive margin
    textAlign: 'center',
    padding: width * 0.02, // Responsive padding
  },
  itemPrice: {
    fontSize: width * 0.045, // Responsive font size
    color: '#0865a2',
    fontWeight: 'bold',
    marginTop: width * 0.01, // Responsive margin
  },
});
