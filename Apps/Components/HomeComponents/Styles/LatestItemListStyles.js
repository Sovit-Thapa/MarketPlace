import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  latestItemListContainer: {
    flex: 1,
    marginHorizontal: width * 0.02, // Responsive margin
  },
  text: {
    fontWeight: 'bold',
    fontSize: width * 0.05, // Responsive font size
    marginBottom: width * 0.03, // Responsive margin
    marginLeft: width * 0.04, // Responsive margin
  },
  flatListContent: {
    paddingHorizontal: width * 0.02, // Responsive padding
    paddingBottom: width * 0.05, // Responsive padding
    marginRight: -width * 0.05, // Responsive margin
  },
});

export default styles;