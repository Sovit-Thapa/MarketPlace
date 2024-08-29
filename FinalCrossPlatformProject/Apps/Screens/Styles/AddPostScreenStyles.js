import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
    paddingTop: 40,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginTop: 20,
    textAlignVertical: 'top',
  },
  descriptionInput: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginTop: 20,
    textAlignVertical: 'top',
    height: 100,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    width: '70%',
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});