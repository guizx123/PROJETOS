import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useStore } from '../src/store/useStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  const initStore = useStore(state => state.initStore);

  useEffect(() => {
    initStore();

    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('sticky-immersive' as any);
    }
  }, [initStore]);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F8FAFC',
          },
          headerShadowVisible: false,
          headerTintColor: '#1E293B',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: true, title: 'Miré Coletor' }} />
        <Stack.Screen name="balance/[id]" options={{ title: 'Coleta' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
