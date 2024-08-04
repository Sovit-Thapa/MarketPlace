import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Share, Alert, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import { doc, deleteDoc, getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import styles from './Styles/ProductDetailScreenStyles';

const { width, height } = Dimensions.get('window');

const scaleFontSize = (size) => (size * width) / 375; 

const handleShareProduct = async (productInfo) => {
  try {
    const result = await Share.share({
      message: `Check out this product: ${productInfo.name} for $${productInfo.price}. More details: ${productInfo.desc}\n\nImage: ${productInfo.image}`,
    });

    if (result.action === Share.sharedAction) {
      console.log('Shared successfully!');
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed.');
    }
  } catch (error) {
    console.error('Error sharing product:', error);
  }
};

export default function ProductDetailScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [productInfo, setProductInfo] = useState({});
  const { user } = useUser();
  const db = getFirestore(app);

  useEffect(() => {
    if (params && params.product) {
      console.log('Product details received:', params.product);
      setProductInfo(params.product);
      navigation.setOptions({
        headerRight: () => (
          <Ionicons 
            name="share-social-sharp" 
            size={scaleFontSize(24)} 
            color="white" 
            style={styles.shareIcon}
            onPress={() => handleShareProduct(params.product)}
          />
        ),
      });
    } else {
      console.error('Product data is not available in params');
    }
  }, [params, navigation]);

  const handleSendMessage = () => {
    const subject = `Interested in ${productInfo.name}`;
    const body = `Hi ${productInfo.userName}, I am interested in your product ${productInfo.name}.`;
    Linking.openURL(`mailto:${productInfo.userEmail}?subject=${subject}&body=${body}`);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this product?',
      [
        { text: 'Yes', onPress: () => handleDeleteProduct() },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleDeleteProduct = async () => {
    const dbQuery = query(collection(db, 'UserPost'), where('name', '==', productInfo.name));
    const querySnapshot = await getDocs(dbQuery);
    querySnapshot.forEach(async (doc) => {
      deleteDoc(doc.ref).then(() => {
        console.log('Document deleted successfully');
        navigation.goBack();
      });
    });
  };

  return (
    <ScrollView style={styles.container}>
      {productInfo.image && (
        <Image source={{ uri: productInfo.image }} style={styles.image} />
      )}
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{productInfo.name}</Text>
          <Text style={styles.price}>${productInfo.price}</Text>
        </View>
        <Text style={styles.category}>{productInfo.category}</Text>
      </View>
      <Text style={styles.descriptionHeading}>Description</Text>
      <Text style={styles.description}>{productInfo.desc}</Text>
      <View style={styles.userContainer}>
        {productInfo.userImage && (
          <Image source={{ uri: productInfo.userImage }} style={styles.userImage} />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{productInfo.userName}</Text>
          <Text style={styles.userEmail}>{productInfo.userEmail}</Text>
        </View>
      </View>
      {user?.primaryEmailAddress?.emailAddress === productInfo.userEmail ? (
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Delete Product</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

