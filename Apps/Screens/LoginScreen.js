import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
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
          Buy & Sell Marketplace where you can sell item and real money.
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
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  innerContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    marginTop: -20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'slategray',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 50,
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});
