import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import UserSettingsForm from '@/components/forms/UserSettingsForm';
import { Button } from '@/components/ui/Button';
import { Label } from "@/components/ui/Label";
import { Modal, ModalContent, ModalTrigger } from '@/components/ui/Modal';
import { Text } from "@/components/ui/Text";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStores } from "@/store/helpers/useStores";
import { useState } from 'react';
import { View } from "react-native";

export default function SettingsTab() {
    const {userStore} = useStores();
    const {colorScheme, toggleColorScheme} = useColorScheme();
    const [modalOpen, setModalOpen] = useState(false)
    
    return (
        <View className="h-full w-full flex py-safe px-6">
            <View className="w-full flex flex-row justify-between items-center pb-4">
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
            
            <Modal open={modalOpen} onOpenChange={(value) => setModalOpen(value)}>
                <ModalTrigger asChild>
                    <Button onPress={() => setModalOpen(true)}>
                        <Text>Edit</Text>
                    </Button>
                </ModalTrigger>
                <ModalContent>
                    <UserSettingsForm setModalOpen={setModalOpen} />
                </ModalContent>
            </Modal>
            </View>
    )
}
