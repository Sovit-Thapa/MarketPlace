import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: width * 0.04, 
    width: width * 0.85, 
    height: width * 0.5, 
    marginHorizontal: width * 0.05, 
    backgroundColor: 'black',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  image: {
    width: '100%', 
    height: '100%', 
    borderRadius: 10, 
  },
});

export default styles;