import React, { useEffect, useCallback } from 'react';
import Routes from './src/routes';
import { useFonts, Montserrat_100Thin } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/context/AuthContext';
import * as Updates from 'expo-updates';

export default function App() {
  const [fontsLoaded] = useFonts({ Montserrat_100Thin });

  useEffect(() => {
    if (!__DEV__) updateApp();
  }, []);

  async function updateApp() {
    const { isAvailable } = await Updates.checkForUpdateAsync();

    if (isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}
