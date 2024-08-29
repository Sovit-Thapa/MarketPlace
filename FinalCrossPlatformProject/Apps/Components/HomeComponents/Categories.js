import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/CategoriesStyles'; 

const { width } = Dimensions.get('window');

export default function Categories({ categoryList }) {
  const chunks = [];
  for (let i = 0; i < categoryList.length; i += 6) {
    chunks.push(categoryList.slice(i, i + 6));
  }

  const navigation = useNavigation();
  const flatListRef = useRef(null); 

  const handleIconPress = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: (width / 3) * 2, 
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Categories</Text>
        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons name="arrow-forward" size={24} color="black" style={styles.more} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef} 
        data={chunks}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <FlatList
            data={item}
            numColumns={3}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ItemList', { category: item.name,  })}
                style={styles.imageContainer}
              >
                <Image
                  source={{ uri: item?.icon }}
                  style={styles.image}
                />
                <Text style={styles.itemName}>{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

