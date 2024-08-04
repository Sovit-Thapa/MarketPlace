import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import { doc, deleteDoc, getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

// Function to handle share button press
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

// Function to handle delete button press


export default function ProductDetailScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [productInfo, setProductInfo] = useState({});
  const { user } = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();

  useEffect(() => {
    if (params && params.product) {
      console.log('Product details received:', params.product);
      setProductInfo(params.product);
      navigation.setOptions({
        headerRight: () => (
          <Ionicons 
            name="share-social-sharp" 
            size={24} 
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
    const dbQuery = query(collection(db, 'UserPost'),where('name', '==', productInfo.name));
    const querySnapshot = await getDocs(dbQuery);
    querySnapshot.forEach(async (doc) => {
      deleteDoc(doc.ref).then(resp=>{
        console.log('Document deleted successfully');
        nav.goBack();
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
        <>
          {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProduct', { product: productInfo })}>
            <Text style={styles.buttonText}>Edit Product</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
            <Text style={styles.buttonText}>Delete Product</Text>
          </TouchableOpacity>
        </>
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
    height: 440,
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 28,
    color: 'green',
    fontWeight: 'bold',
  },
  category: {
    fontSize: 18,
    backgroundColor: 'lightblue',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  descriptionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#d5e9ef',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareIcon: {
    marginRight: 10, // Adjust margin as needed
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red color for delete button
  },
});
