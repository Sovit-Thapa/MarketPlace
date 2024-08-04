import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: width * 0.04, // Responsive margin
    width: width * 0.85, // Responsive width
    height: width * 0.5, // Responsive height based on width
    marginHorizontal: width * 0.05, // Responsive margin
    backgroundColor: 'black',
    justifyContent: 'center', // Center image if needed
    alignItems: 'center', // Center image if needed
  },
  image: {
    width: '100%', // Full width of the container
    height: '100%', // Full height of the container
    borderRadius: 10, // Optional: add some border radius
  },
});

export default styles;