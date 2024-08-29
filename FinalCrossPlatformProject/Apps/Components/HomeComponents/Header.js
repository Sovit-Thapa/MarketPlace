import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/HeaderStyles.js';

export default function Header() {
  const { user } = useUser();
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'UserPost'), orderBy('name'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllPosts(itemsArray);
      filterResults(searchText, itemsArray);
    }, (error) => {
      console.error('Error fetching items:', error);
    });

    return () => unsubscribe();
  }, [db]);

  const filterResults = (text, posts) => {
    if (text.trim() === '') {
      setSearchResults([]);
      return;
    }
    const searchLowerCase = text.toLowerCase();
    const filteredResults = posts.filter(post => post.name.toLowerCase().includes(searchLowerCase));
    setSearchResults(filteredResults);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    filterResults(text, allPosts);
  };

  const handlePress = (item) => {
    navigation.push('ProductDetail', { product: item, id: item.id });
  };

  return (
    <View>
      {/* User Info Section */}
      <View style={styles.container}>
        <Image source={{ uri: user?.imageUrl }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>{user?.fullName}</Text>
        </View>
      </View>
      {/* Search bar Section */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={30} color="black" />
        <TextInput
          placeholder='Search'
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      {/* Search Results */}
      {searchResults.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultContainer}
                onPress={() => handlePress(item)}
              >
                <Image source={{ uri: item.image }} style={styles.resultImage} />
                <Text style={styles.resultText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

