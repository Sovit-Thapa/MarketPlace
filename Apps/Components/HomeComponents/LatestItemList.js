import { View, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import MarketItem from './MarketItem';

export default function LatestItemList({ latestItemList, heading }) {
  return (
    <View style={styles.latestItemListContainer}>
      {heading && <Text style={styles.text}>{heading}</Text>}
      <FlatList
        data={latestItemList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => <MarketItem item={item} />}
        contentContainerStyle={styles.flatListContent} // Add styling to ensure proper spacing
      />
    </View>
  );
}

const styles = StyleSheet.create({
  latestItemListContainer: {
    flex: 1,
    marginLeft: -9,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 30,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
