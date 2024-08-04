import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

export default function Slider({ sliderList }) {
  const flatListRef = useRef();
  const [index, setIndex] = useState(0); // Add this line


  // Add this useEffect hook
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1 === sliderList.length ? 0 : prevIndex + 1;
        flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
        return newIndex;
      });
    }, 7000); // Change this value to adjust the scrolling speed

    return () => clearInterval(interval); // This will clear Interval when component unmounts
  }, [sliderList]);

  return (
    <View>
      <FlatList
        ref={flatListRef} // Add this line
        data={sliderList}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.imageContainer}>
              <Image
                source={{uri:item?.image}}
                style={styles.image}
              />
            </View>
          );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'black',
  },
  image: {
    width: 380,
    height: 200,
  },
});