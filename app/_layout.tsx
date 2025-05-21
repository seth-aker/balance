import { NAV_THEME } from "@/constants/themeColors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useInitialRootStore, useStores } from "@/store/helpers/useStores";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};
const useIsomorphicLayoutEffect =
    Platform.OS === 'web' && typeof window === 'undefined' ? useEffect : useLayoutEffect;


export default function RootLayout() {
  SplashScreen.preventAutoHideAsync()
  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.
    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(SplashScreen.hideAsync, 500)
  })

  const hasMounted = useRef(false);
  const { isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  const {userStore} = useStores()
  useEffect(() => {
    userStore.fetch().then(() => {
      setLoading(false)
    })
  }, [])

  if (!isColorSchemeLoaded || !rehydrated || loading) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} /> 
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
