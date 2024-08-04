import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import TabNavigation from './Apps/Navigations/TabNavigation';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_bWFnaWNhbC1maXNoLTY3LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}