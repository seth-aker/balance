import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { UserSettings } from '@/components/forms/UserSettings';
import { Button } from '@/components/ui/Button';
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Text";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStores } from "@/store/helpers/useStores";
import { useState } from 'react';
import { Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsTab() {
    const {userStore} = useStores();
    const {colorScheme, toggleColorScheme} = useColorScheme();
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <SafeAreaView className="h-full w-full px-6 flex">
            <View className="w-full flex flex-row justify-between items-center">
                <Text className="text-4xl">Settings</Text>
                <View className='flex flex-row items-center'>
                    <Label>Color Mode: </Label>
                    <ColorModeSwitch checked={colorScheme === "dark"} onCheckedChange={toggleColorScheme} />
                </View>
            </View>
            <View className='flex flex-row items-center'>
                <Label>Name: </Label>
                <Text>{userStore.firstName} {userStore.lastName}</Text>
            </View>
            <View className='flex flex-row items-center'>
                <Label nativeID="email">Email: </Label>
                <Text>{userStore.email}</Text>
            </View>
            <Button onPress={() => setModalOpen(true)}>
                <Text>Edit</Text>
            </Button>
            <Modal 
                className='bg-primary'
                visible={modalOpen}
                animationType='slide'
                onRequestClose={() => setModalOpen(false)}>
                <SafeAreaView>
                    <UserSettings />
                    <Button onPress={() => setModalOpen(false)} >
                        <Text>Close</Text>
                    </Button>  
                </SafeAreaView>    
            </Modal>
        </SafeAreaView>
    )
}