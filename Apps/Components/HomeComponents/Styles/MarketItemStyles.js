import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: width * 0.05, 
    width: width * 0.42, 
    height: width * 0.60, 
    margin: width * 0.02, 
  },
  imageWrapper: {
    flex: 1,
    padding: width * 0.02,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: width * 0.05,
  },
  image: {
    width: '100%',
    height: width * 0.30, 
    borderRadius: width * 0.05, 
  },
  itemName: {
    fontSize: width * 0.045, 
    fontWeight: 'bold',
    marginTop: width * 0.02, 
  },
  itemCategory: {
    backgroundColor: '#aee4ed',
    borderRadius: width * 0.02, 
    fontSize: width * 0.04, 
    marginTop: width * 0.02, 
    textAlign: 'center',
    padding: width * 0.02, 
  },
  itemPrice: {
    fontSize: width * 0.045, 
    color: '#0865a2',
    fontWeight: 'bold',
    marginTop: width * 0.01, 
  },
});

export default styles;