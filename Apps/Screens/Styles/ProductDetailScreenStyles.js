import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scaleFontSize = (size) => (size * width) / 375; 

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: height * 0.4, 
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: width * 0.05, 
    paddingTop: height * 0.02, 
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFontSize(28), 
    fontWeight: 'bold',
  },
  price: {
    fontSize: scaleFontSize(28),
    color: 'green',
    fontWeight: 'bold',
  },
  category: {
    fontSize: scaleFontSize(18), 
    backgroundColor: 'lightblue',
    paddingHorizontal: width * 0.03, 
    paddingVertical: height * 0.01, 
    borderRadius: width * 0.02, 
    marginTop: height * 0.01,
    alignSelf: 'flex-start',
  },
  descriptionHeading: {
    fontSize: scaleFontSize(20), 
    fontWeight: 'bold',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02, 
  },
  description: {
    fontSize: scaleFontSize(18), 
    textAlign: 'justify',
    paddingHorizontal: width * 0.05, 
    paddingVertical: height * 0.02, 
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, 
    paddingVertical: height * 0.02, 
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#d5e9ef',
  },
  userImage: {
    width: width * 0.15, 
    height: width * 0.15, 
    borderRadius: (width * 0.15) / 2, 
    marginRight: width * 0.02, 
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: scaleFontSize(18), 
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: scaleFontSize(16),
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: width * 0.05, 
    paddingVertical: height * 0.015, 
    paddingHorizontal: width * 0.05, 
    marginHorizontal: width * 0.05, 
    marginVertical: height * 0.02, 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: scaleFontSize(16), 
    fontWeight: 'bold',
  },
  shareIcon: {
    marginRight: width * 0.02,
  },
  deleteButton: {
    backgroundColor: '#dc3545', 
  },
});