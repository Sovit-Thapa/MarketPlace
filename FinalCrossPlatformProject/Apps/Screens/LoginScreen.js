import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import styles from './Styles/LoginScreenStyles';

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
        <Text style={styles.title}>Thrift Haven</Text>
        <Text style={styles.subtitle}>
          Discover Deals and Find Treasures—Buy, Sell, and Earn with Ease!
        </Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
