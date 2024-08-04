import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import React from 'react';
import MarketItem from './MarketItem';

const { width } = Dimensions.get('window');

export default function LatestItemList({ latestItemList, heading }) {
  return (
    <View style={styles.latestItemListContainer}>
      {heading && <Text style={styles.text}>{heading}</Text>}
      <FlatList
        data={latestItemList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => <MarketItem item={item} />}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  latestItemListContainer: {
    flex: 1,
    marginHorizontal: width * 0.02, // Responsive margin
  },
  text: {
    fontWeight: 'bold',
    fontSize: width * 0.05, // Responsive font size
    marginBottom: width * 0.03, // Responsive margin
    marginLeft: width * 0.04, // Responsive margin
  },
  flatListContent: {
    paddingHorizontal: width * 0.02, // Responsive padding
    paddingBottom: width * 0.05, // Responsive padding
    marginRight: -width * 0.05, // Responsive margin
  },
});
