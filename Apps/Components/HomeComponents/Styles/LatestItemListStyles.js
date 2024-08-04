import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  latestItemListContainer: {
    flex: 1,
    marginHorizontal: width * 0.02, 
  },
  text: {
    fontWeight: 'bold',
    fontSize: width * 0.05, 
    marginBottom: width * 0.03, 
    marginLeft: width * 0.04,
  },
  flatListContent: {
    paddingHorizontal: width * 0.02,
    paddingBottom: width * 0.05, 
    marginRight: -width * 0.05,
  },
});

export default styles;