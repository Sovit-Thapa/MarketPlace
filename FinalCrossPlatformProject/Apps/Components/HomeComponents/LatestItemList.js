import { View, FlatList, Text, Dimensions } from 'react-native';
import React from 'react';
import MarketItem from './MarketItem';
import styles from './Styles/LatestItemListStyles'; 

const { width } = Dimensions.get('window');

export default function LatestItemList({ latestItemList, heading }) {
  return (
    <View style={styles.latestItemListContainer}>
      {heading && <Text style={styles.text}>{heading}</Text>}
      <FlatList
        data={latestItemList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => {
          console.log('Rendering item:', item);  // Print each item to the console
          return <MarketItem item={item} />;
        }}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}
