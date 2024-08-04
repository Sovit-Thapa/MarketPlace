import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
          <Ionicons name="arrow-forward" size={24} color="black" style={styles.more} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef} // Attach the ref to FlatList
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
    marginTop: height * 0.01, // Responsive margin top
    paddingHorizontal: width * 0.05, // Responsive padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01, // Responsive margin bottom
  },
  text: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
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
    padding: width * 0.02, // Responsive padding
    borderWidth: 1,
    borderColor: '#000',
    margin: width * 0.01, // Responsive margin
    marginRight: width * 0.07, // Responsive margin
    borderRadius: width * 0.05, // Responsive border radius
    marginBottom: height * 0.02, // Responsive margin bottom
  },
  itemName: {
    marginTop: height * 0.005, // Responsive margin top
    textAlign: 'center',
    fontSize: width * 0.03, // Responsive font size
    color: '#000',
  },
});

