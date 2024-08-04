import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  text: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  more: {
    color: '#000',
  },
  image: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
  },
  imageContainer: {
    width: (width / 3) - 50,
    height: (width / 3) - 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.02,
    borderWidth: 1,
    borderColor: '#000',
    margin: width * 0.01,
    marginRight: width * 0.07,
    borderRadius: width * 0.05,
    marginBottom: height * 0.02,
  },
  itemName: {
    marginTop: height * 0.005,
    textAlign: 'center',
    fontSize: width * 0.03,
    color: '#000',
  },
});

export default styles;