import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height * 0.4,
    resizeMode: 'cover',
  },
  innerContainer: {
    padding: width * 0.05,
    borderTopLeftRadius: width * 0.1,
    borderTopRightRadius: width * 0.1,
    backgroundColor: 'white',
    marginTop: -width * 0.1,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: width * 0.05,
    color: 'slategray',
    marginTop: width * 0.03,
  },
  button: {
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.1,
    backgroundColor: 'blue',
    borderRadius: width * 0.1,
    marginTop: width * 0.2,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: width * 0.05,
  },
});