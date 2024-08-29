import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from '../../firebaseConfig';
import { collection, onSnapshot, getFirestore, query, where } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../Components/HomeComponents/LatestItemList';

export default function MyProductListScreen() {
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'UserPost'),
        where("userEmail", "==", user.primaryEmailAddress.emailAddress)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const postsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsList);
      }, (error) => {
        console.error("Error fetching posts: ", error);
      });

      return () => unsubscribe();
    }
  }, [user, db]);

  return (
    <View style={{ flex: 1 }}>
      <LatestItemList latestItemList={posts} myItems={true} />
    </View>
  );
}
