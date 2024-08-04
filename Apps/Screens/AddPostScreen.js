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
      //console.log('Uploaded a blob or file !');
    }).then((response) => {
      getDownloadURL(storageRef).then(async (url) => {
        //console.log(url);
        value.image = url;
        value.userName = user.fullName;
        value.userEmail = user.primaryEmailAddress.emailAddress;
        value.userImage = user.imageUrl;

        const docRef = await addDoc(collection(db, "UserPost"), value);
        if (docRef.id) {
          setLoading(false);
          Alert.alert("Success", "Post added successfully");
          resetForm(); // Reset the form after successful submission
          setImage(null); // Reset the image state
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
          initialValues={{ name: '', desc: '', category: '', address: '', price: '', image: '', userName: '', userEmail: '', userImage: '', createdDate:Date.now() }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => onSubmitMethod(values, { resetForm })}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => pickImage(setFieldValue)}>
                  {image ?
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 20, borderRadius: 20 }} />
                    : <Image source={require('./../../assets/images/holder.webp')}
                      style={{ width: 100, height: 100, borderRadius: 20 }} />
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
                  style={styles.input}
                  placeholder='Description'
                  value={values.desc}
                  numberOfLines={4}
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
                  <Picker selectedValue={values?.category} onValueChange={handleChange('category')}>
                    {values.category === "" && <Picker.Item label="None" value="" />}
                    {categoryList && categoryList.map((category, index) => {
                      return <Picker.Item key={index} label={category.name} value={category.name} />
                    })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
   // paddingTop: 40,
    padding: 40,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginTop: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // This will make the button oval
    height: 50, // This will make the button big
    width: '70%', // This will make the button long
    backgroundColor: 'green', // This will change the background color of the button
  },
  buttonText: {
    color: 'white', // This will change the text color of the button
    fontSize: 18, // This will change the font size of the button text
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});
