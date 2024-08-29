import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { collection, getFirestore, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeComponents/LatestItemList';
import styles from './Styles/ItemListByCategoryStyles';

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (params) {
      const q = query(collection(db, 'UserPost'), where('category', '==', params.category));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const itemsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsArray);
      }, (error) => {
        console.error('Error fetching items:', error);
      });
  
      return () => unsubscribe();
    }
  }, [params]);

  return (
    <View style={{ flex: 1 }}>
      {items.length > 0 ? (
        <LatestItemList latestItemList={items} heading={''} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>No items found in this category.</Text>
        </View>
      )}
    </View>
  );
}