import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Categories({ categoryList }) {
  // Split the categoryList into chunks of 6 (3 columns * 2 rows)
  const chunks = [];
  for (let i = 0; i < categoryList.length; i += 6) {
    chunks.push(categoryList.slice(i, i + 6));
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Categories</Text>
        <Ionicons name="arrow-forward" size={24} color="black" style={styles.more}/>
      </View>
      <FlatList
        data={chunks}
        horizontal={true}
        renderItem={({item, index}) => {
          return (
            <FlatList
              data={item}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity 
                  onPress={()=>navigation.navigate('ItemList', {category: item.name})}
                  style={styles.imageContainer}>
                    <Image 
                      source={{uri:item?.icon}}
                      style={styles.image} // Use StyleSheet for image styling
                    />
                    <Text style={styles.itemName}>{item?.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10, // Adjust this value as needed
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25, // Adjust this value as needed
  },
  image: {
    width: 50, // Adjust this value as needed
    height: 50, // Adjust this value as needed
  },
  imageContainer: {
    width: 100, // Adjust this value as needed
    height: 100, // Adjust this value as needed
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Adjust this value as needed
    borderWidth: 1, // Adjust this value as needed
    borderColor: '#000', // Adjust this value as needed
    margin: 22, // Adjust this value as needed
    borderRadius: 20, // Adjust this value as needed
    marginTop: 10, // Adjust this value as needed
  },
  itemName: {
    marginTop: 4, // Adjust this value as needed
    textAlign: 'center',
    fontSize: 15, // Adjust this value as needed
    color: '#000', // Adjust this value as needed
    // Add other styles as needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  more: { // Adjust this value as needed
    color: '#000', // Adjust this value as needed
    // Add other styles as needed
    marginRight: 30, // Adjust this value as needed
  },
});