import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 40, 
    paddingHorizontal: 20, 
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  searchInput: {
    height: 30,
    fontSize: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  dropdown: {
    position: 'relative', 
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 200, 
    marginHorizontal: 20,
    marginTop: 10,
    zIndex: 1000,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  resultText: {
    fontSize: 18,
  },
});

export default styles;