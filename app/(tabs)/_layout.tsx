import { HapticTab } from "@/components/HapticTab";
import { Home } from "@/components/ui/icons/Home";
import { Settings } from "@/components/ui/icons/Settings";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
    return (
        <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
                ios: {
                // Use a transparent background on iOS to show the blur effect
                position: 'absolute',
                },
                default: {},
            }),
        }}>
            <Tabs.Screen 
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: (props) => <Home {...props}/>
                }}  />
            <Tabs.Screen 
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: (props) => <Settings {...props} />
                }}
            />
        </Tabs>
    )
}