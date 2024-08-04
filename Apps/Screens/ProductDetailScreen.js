import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Share, Alert, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import { doc, deleteDoc, getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

const { width, height } = Dimensions.get('window');

const scaleFontSize = (size) => (size * width) / 375; // Base width

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: height * 0.4, // Responsive height
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingTop: height * 0.02, // Responsive padding
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFontSize(28), // Responsive font size
    fontWeight: 'bold',
  },
  price: {
    fontSize: scaleFontSize(28), // Responsive font size
    color: 'green',
    fontWeight: 'bold',
  },
  category: {
    fontSize: scaleFontSize(18), // Responsive font size
    backgroundColor: 'lightblue',
    paddingHorizontal: width * 0.03, // Responsive padding
    paddingVertical: height * 0.01, // Responsive padding
    borderRadius: width * 0.02, // Responsive border radius
    marginTop: height * 0.01, // Responsive margin
    alignSelf: 'flex-start',
  },
  descriptionHeading: {
    fontSize: scaleFontSize(20), // Responsive font size
    fontWeight: 'bold',
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingTop: height * 0.02, // Responsive padding
  },
  description: {
    fontSize: scaleFontSize(18), // Responsive font size
    textAlign: 'justify',
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingVertical: height * 0.02, // Responsive padding
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingVertical: height * 0.02, // Responsive padding
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#d5e9ef',
  },
  userImage: {
    width: width * 0.15, // Responsive width
    height: width * 0.15, // Responsive height
    borderRadius: (width * 0.15) / 2, // Responsive border radius
    marginRight: width * 0.02, // Responsive margin
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: scaleFontSize(18), // Responsive font size
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: scaleFontSize(16), // Responsive font size
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: width * 0.05, // Responsive border radius
    paddingVertical: height * 0.015, // Responsive padding
    paddingHorizontal: width * 0.05, // Responsive padding
    marginHorizontal: width * 0.05, // Responsive margin
    marginVertical: height * 0.02, // Responsive margin
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: scaleFontSize(16), // Responsive font size
    fontWeight: 'bold',
  },
  shareIcon: {
    marginRight: width * 0.02, // Responsive margin
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Responsive background color
  },
});
