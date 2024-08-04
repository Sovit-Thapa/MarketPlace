import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeComponents/LatestItemList';

export default function ExploreScreen() {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const productsQuery = query(collection(db, 'UserPost'), orderBy('createdDate', 'desc'));
    
    const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
      const productsList = snapshot.docs.map(doc => doc.data());
      setProducts(productsList); 
    }, (error) => {
      console.error('Error fetching products:', error);
    });

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
