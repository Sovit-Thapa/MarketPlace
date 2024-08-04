import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function MarketItem({item}) {

  const navigation = useNavigation(); 

  return (
    <TouchableOpacity 
    onPress={()=>navigation.push('ProductDetail', {product: item})}
    style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{"$ "+item.price}</Text>
            </View>
          </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 25,
  },
  imageContainer: {
    borderRadius: 25,
    width: 210, // specify the width
    height: 200, // specify the height
    marginTop: 10,
    marginBottom: 45,
  },
  imageWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    marginLeft: 25,
  },
  image: {
    width: 170,
    height: 120,
    borderRadius: 25,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemCategory: {
    backgroundColor: '#aee4ed',
    borderRadius: 10,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    padding: 3,
  },
  itemPrice: {
    fontSize: 18,
    color: '#0865a2',
    fontWeight: 'bold',
  },
 
});

