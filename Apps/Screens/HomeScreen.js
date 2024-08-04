import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { collection, onSnapshot, getFirestore, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Header from '../Components/HomeComponents/Header';
import Slider from '../Components/HomeComponents/Slider';
import Categories from '../Components/HomeComponents/Categories';
import LatestItemList from '../Components/HomeComponents/LatestItemList'; 

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(() => {
    const unsubscribeSliders = onSnapshot(collection(db, 'Sliders'), (snapshot) => {
      const sliders = snapshot.docs.map(doc => doc.data());
      setSliderList(sliders);
    });

    const unsubscribeCategories = onSnapshot(collection(db, 'Category'), (snapshot) => {
      const categories = snapshot.docs.map(doc => doc.data());
      setCategoryList(categories);
    });

    const unsubscribeLatestItems = onSnapshot(collection(db, 'UserPost'), orderBy("createdAt", "desc"), (snapshot) => {
      const latestItems = snapshot.docs.map(doc => doc.data());
      setLatestItemList(latestItems);
    });

    return () => {
      unsubscribeSliders();
      unsubscribeCategories();
      unsubscribeLatestItems();
    };
  }, [db]);

  const renderListHeader = () => (
    <View style={styles.headerContainer}>
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
    </View>
  );

  return (
    <FlatList
      data={latestItemList}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      ListHeaderComponent={renderListHeader}
      renderItem={({ item }) => <View />} 
      ListFooterComponent={<LatestItemList latestItemList={latestItemList} heading={'Latest Items'} />} 
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerContainer: {
    marginBottom: 10,
  },
});
