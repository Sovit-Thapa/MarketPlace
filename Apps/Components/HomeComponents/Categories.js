import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Categories({ categoryList }) {
  const chunks = [];
  for (let i = 0; i < categoryList.length; i += 6) {
    chunks.push(categoryList.slice(i, i + 6));
  }

  const navigation = useNavigation();
  const flatListRef = useRef(null); // Create a ref for FlatList

  const handleIconPress = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: (width / 3) * 2, // Scroll to the next section
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Categories</Text>
        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons name="arrow-forward" size={24} color="black" style={styles.more}/>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef} // Attach the ref to FlatList
        data={chunks}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <FlatList
            data={item}
            numColumns={3}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('ItemList', { category: item.name })}
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

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10, // Adjusted for responsive padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  more: { 
    color: '#000',
  },
  image: {
    width: '70%',
    height: undefined,
    aspectRatio: 1, // Maintain a square aspect ratio
  },
  imageContainer: {
    width: (width / 3) - 50, // Responsive width
    height: (width / 3) - 50, // Responsive height
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  itemName: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
});
