import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const { width } = Dimensions.get('window');

export default function Slider({ sliderList }) {
  const flatListRef = useRef();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1 === sliderList.length ? 0 : prevIndex + 1;
        flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
        return newIndex;
      });
    }, 7000); 

    return () => clearInterval(interval);
  }, [sliderList]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={sliderList}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item?.image }}
              style={styles.image}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: width * 0.04, // Responsive margin
    width: width * 0.85, // Responsive width
    height: width * 0.5, // Responsive height based on width
    marginHorizontal: width * 0.05, // Responsive margin
    backgroundColor: 'black',
    justifyContent: 'center', // Center image if needed
    alignItems: 'center', // Center image if needed
  },
  image: {
    width: '100%', // Full width of the container
    height: '100%', // Full height of the container
    borderRadius: 10, // Optional: add some border radius
  },
});
