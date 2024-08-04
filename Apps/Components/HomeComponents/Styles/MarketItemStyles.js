import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: width * 0.05, // Responsive border radius
    width: width * 0.42, // Responsive width
    height: width * 0.60, // Responsive height
    margin: width * 0.02, // Responsive margin
  },
  imageWrapper: {
    flex: 1,
    padding: width * 0.02, // Responsive padding
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: width * 0.05, // Responsive border radius
  },
  image: {
    width: '100%',
    height: width * 0.30, // Responsive height
    borderRadius: width * 0.05, // Responsive border radius
  },
  itemName: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
    marginTop: width * 0.02, // Responsive margin
  },
  itemCategory: {
    backgroundColor: '#aee4ed',
    borderRadius: width * 0.02, // Responsive border radius
    fontSize: width * 0.04, // Responsive font size
    marginTop: width * 0.02, // Responsive margin
    textAlign: 'center',
    padding: width * 0.02, // Responsive padding
  },
  itemPrice: {
    fontSize: width * 0.045, // Responsive font size
    color: '#0865a2',
    fontWeight: 'bold',
    marginTop: width * 0.01, // Responsive margin
  },
});

export default styles;