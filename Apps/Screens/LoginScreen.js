import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        if (signIn) {
          console.log('Sign in required:', signIn);
        }
        if (signUp) {
          console.log('Sign up required:', signUp);
        }
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/login.jpg')}
        style={styles.image}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Community Marketplace</Text>
        <Text style={styles.subtitle}>
          Buy & Sell Marketplace where you can sell items and make real money.
        </Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
