import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeComponents/LatestItemList';
import styles from './Styles/ExploreScreenStyles';

export default function ExploreScreen() {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const productsQuery = query(collection(db, 'UserPost'), orderBy('createdDate', 'desc'));
    
    const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

