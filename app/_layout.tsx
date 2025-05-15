import { NAV_THEME } from "@/constants/themeColors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
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
    Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;


export default function RootLayout() {
  const hasMounted = React.useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

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

    if (!isColorSchemeLoaded) {
      return null;
    }
  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <Stack>
        <Stack.Screen name="index" /> 
      </Stack>
    </ThemeProvider>
  );
}
