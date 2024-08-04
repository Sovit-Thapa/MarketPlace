import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from '../../firebaseConfig.js';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';
import * as Yup from 'yup';
import styles from './Styles/AddPostScreenStyles.js';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList(categoryList => [...categoryList, doc.data()]);
    });
  };

  const pickImage = async (setFieldValue) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFieldValue("image", result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value, { resetForm }) => {
    setLoading(true);
    value.image = image;
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, 'marketPlacePost/' + Date.now() + '.jpg');
    uploadBytes(storageRef, blob).then((snapshot) => {
    }).then((response) => {
      getDownloadURL(storageRef).then(async (url) => {
        value.image = url;
        value.userName = user.fullName;
        value.userEmail = user.primaryEmailAddress.emailAddress;
        value.userImage = user.imageUrl;

        const docRef = await addDoc(collection(db, "UserPost"), value);
        if (docRef.id) {
          setLoading(false);
          Alert.alert("Success", "Post added successfully");
          resetForm(); 
          setImage(null); 
        }
      });
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    desc: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').typeError('Price must be a number'),
    address: Yup.string().required('Address is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.string().required('Image is required')
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.heading}>Add Post</Text>
        <Text style={styles.subheading}>Fill in the details below to add a new post.</Text>

        <Formik
          initialValues={{ name: '', desc: '', category: '', address: '', price: '', image: '', userName: '', userEmail: '', userImage: '', createdDate: Date.now() }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => onSubmitMethod(values, { resetForm })}
        >
          {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => pickImage(setFieldValue)}>
                  {image ?
                    <Image source={{ uri: image }} style={styles.image} />
                    : <Image source={require('./../../assets/images/holder.webp')} style={styles.image} />
                  }
                </TouchableOpacity>
                {errors.image && touched.image && (
                  <Text style={styles.errorText}>{errors.image}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder='Title'
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                <TextInput
                  style={styles.descriptionInput}
                  placeholder='Description'
                  value={values.desc}
                  multiline
                  onChangeText={handleChange('desc')}
                />
                {errors.desc && touched.desc && (
                  <Text style={styles.errorText}>{errors.desc}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder='Price'
                  value={values.price}
                  keyboardType='number-pad'
                  onChangeText={handleChange('price')}
                />
                {errors.price && touched.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder='Address'
                  value={values.address}
                  onChangeText={handleChange('address')}
                />
                {errors.address && touched.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}

                <View style={styles.pickerContainer}>
                  <Picker selectedValue={values.category} onValueChange={handleChange('category')}>
                    <Picker.Item label="Select a category" value="" />
                    {categoryList.map((category, index) => (
                      <Picker.Item key={index} label={category.name} value={category.name} />
                    ))}
                  </Picker>
                </View>
                {errors.category && touched.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
                )}

                <View style={styles.buttonWrapper}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                    {loading ? <ActivityIndicator color={'white'} /> :
                      <Text style={styles.buttonText}>Submit Post</Text>
                    }
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

