import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Categories({ categoryList }) {
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
                      style={styles.image}
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
    marginTop: 10, 
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  image: {
    width: 50, 
    height: 50,
  },
  imageContainer: {
    width: 100, 
    height: 100, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#000', 
    margin: 22, 
    borderRadius: 20, 
    marginTop: 10, 
  },
  itemName: {
    marginTop: 4, 
    textAlign: 'center',
    fontSize: 15, 
    color: '#000', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  more: { 
    color: '#000', 
    marginRight: 30, 
  },
});