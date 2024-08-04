import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeComponents/LatestItemList';

export default function ExploreScreen() {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    // Create a query to get the products in descending order by 'createdDate'
    const productsQuery = query(collection(db, 'UserPost'), orderBy('createdDate', 'desc'));
    
    // Set up a real-time listener for the query
    const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
      const productsList = snapshot.docs.map(doc => doc.data());
      setProducts(productsList); // Update state with the new products list
    }, (error) => {
      console.error('Error fetching products:', error);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [db]);

  const renderHeader = () => (
    <Text style={styles.text}>Explore More</Text>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <LatestItemList latestItemList={[item]} />}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.flatListContent}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 45,
    marginLeft: 25,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
    marginLeft: 8,
  },
});
