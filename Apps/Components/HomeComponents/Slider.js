import { View, FlatList, Image, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Styles/SliderStyles'; // Import styles

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