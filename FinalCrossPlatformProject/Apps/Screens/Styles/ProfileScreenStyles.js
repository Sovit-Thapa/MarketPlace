import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const scaleFontSize = (size) => (size * width) / 375;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: width * 0.05,
    marginTop: height * 0.05,
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    marginBottom: height * 0.02,
  },
  username: {
    fontSize: scaleFontSize(30),
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  email: {
    fontSize: scaleFontSize(22),
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.02,
  },
  button: {
    flex: 1,
    height: height * 0.12,
    marginHorizontal: width * 0.02,
    backgroundColor: '#07518b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.05,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFontSize(16),
    marginLeft: width * 0.02,
  },
  notificationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.12,
    marginHorizontal: width * 0.02,
    borderRadius: width * 0.05,
    backgroundColor: '#07518b',
  },
  notificationText: {
    fontSize: scaleFontSize(14),
    color: '#fff',
    marginLeft: width * 0.02,
  },
  logoutButton: {
    width: '100%',
    height: height * 0.12,
    backgroundColor: '#d03446',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.05,
    marginTop: height * 0.02,
    flexDirection: 'row',
  },
  logoutText: {
    color: '#fff',
    fontSize: scaleFontSize(22),
    marginLeft: width * 0.02,
  },
});
