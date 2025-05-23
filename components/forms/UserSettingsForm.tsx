import { useStores } from "@/store/helpers/useStores";
import { observer } from "mobx-react-lite";
import { ModalProps, View } from "react-native";
import MoneyInput from "../MoneyInput";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Text } from '../ui/Text';

export interface UserSettingsModalProps extends ModalProps {
    setModalOpen: (value: boolean) => void
}
export default observer(function UserSettings(props: UserSettingsModalProps) {
    const { userStore, transactionStore } = useStores();
    const setBankBalance = (value: string) => {
        if(!value || value === '') {
            transactionStore.setProp('bankBalanceCents', 0);
        } else {
            transactionStore.setProp('bankBalanceCents', Number.parseInt(value))
        }
    }
    return (
            <View className='py-safe px-4 bg-background'>
                <Text className='text-2xl'>Edit User</Text>
                <View className="w-full flex py-6">
                    <View className="flex">
                        <Label>First Name: </Label>
                        <Input 
                            value={userStore.firstName} 
                            onChangeText={((text) => userStore.setProp('firstName', text))} />
                    </View>
                    <View className="flex">
                        <Label>Last Name: </Label>
                        <Input 
                            value={userStore.lastName}
                            onChangeText={((text) => userStore.setProp('lastName', text))}
                            />
                    </View>
                    <View className="flex">    
                        <Label>Email: </Label>
                        <Input
                            value={userStore.email}
                            onChangeText={((text) => userStore.setProp('email', text))}
                            />
                    </View>
                    <View>
                        <Label>Bank Account Balance</Label>
                        <MoneyInput 
                            value={`${transactionStore.bankBalanceCents}`}
                            onChangeText={setBankBalance}
                            className="flex justify-center h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
                         />
                    </View>
                </View>
                <Button onPress={() => props.setModalOpen(false)}>
                    <Text>Save</Text>
                </Button>
            </View>
    )
})
