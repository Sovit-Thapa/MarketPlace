import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { collection, getFirestore, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeComponents/LatestItemList';

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (params) {
      // Listen for real-time updates
      const q = query(collection(db, 'UserPost'), where('category', '==', params.category));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const itemsArray = snapshot.docs.map(doc => doc.data());
        setItems(itemsArray);
      }, (error) => {
        console.error('Error fetching items:', error);
      });

      // Cleanup subscription on component unmount
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
