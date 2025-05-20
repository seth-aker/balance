import { useStores } from "@/store/helpers/useStores";
import { View } from "react-native";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export function UserSettings() {
    const { userStore } = useStores();
    return (
        <View className="w-screen h-screen flex p-6">
            <View className="flex">
                <Label>First Name: </Label>
                <Input 
                    value={userStore.firstName} 
                    onChangeText={(input) => userStore.setProp("firstName", input)} />
            </View>
            <View className="flex">
                <Label>Last Name: </Label>
                <Input 
                    value={userStore.lastName}
                    onChangeText={(input) => userStore.setProp('lastName', input)} />
            </View>
            <View className="">    
                <Label>Email: </Label>
                <Input
                    value={userStore.email}
                    onChangeText={(input) => userStore.setProp('email', input)} />
            </View>
        </View>
    )
}