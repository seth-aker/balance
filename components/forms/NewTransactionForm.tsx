import { useStores } from "@/store/helpers/useStores";
import { TTransactionType } from "@/store/models/Transaction";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { View, ViewProps } from "react-native";
import uuid from 'react-native-uuid';
import MoneyInput from "../MoneyInput";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { Text } from "../ui/Text";

export interface NewTransactionFormModalProps extends ViewProps {
    inputValue: string
    onInputChange: (value: string) => void,
    setModalOpen: (value: boolean) => void
}
export default observer(function NewTransactionFormModal(props: NewTransactionFormModalProps) {
    const {userStore, transactionStore} = useStores();
    const [description, setDescription] = useState('');
    const [type, setType] = useState<TTransactionType>('Credit')
    const selectOption = {value: type, label: type}
    const createTransaction = () => {
        const transactionAmountCents = Number.parseInt(props.inputValue);
        if(type === 'Credit'){
            transactionStore.addPendingTransaction({
                id: uuid.v4(),
                amountCents: Number.isNaN(transactionAmountCents) ? 0: transactionAmountCents, 
                createdBy: userStore.userId,
                description: description,
                createdOn: Date.now(),
                type: type,
                paid: false,
            })
        } else {
            transactionStore.addAppliedTransaction({
                id: uuid.v4(),
                amountCents: Number.isNaN(transactionAmountCents) ? 0: transactionAmountCents,
                createdBy: userStore.userId,
                description,
                createdOn: Date.now(),
                type,
                paid: true
            })
            const newBalanceCents = transactionStore.bankBalanceCents - transactionAmountCents
            transactionStore.setProp('bankBalanceCents', newBalanceCents)
        }
        props.onInputChange('');
        props.setModalOpen(false)
    }
    return (
        <View className={cn('h-full p-6 flex gap-4', props.className)}>
            <MoneyInput 
                value={props.inputValue} 
                onChangeText={props.onInputChange} 
                className="flex items-center" 
                textClassName="font-bold text-7xl" 
                cursorClassName="text-7xl"/>
            <View className="flex gap-1">
                <Label>Transaction Type</Label>
                <Select value={selectOption} onValueChange={(value) => setType(value?.value as TTransactionType)}>
                    <SelectTrigger>
                        <SelectValue className="text-foreground" placeholder="Select a transaction type" />
                    </SelectTrigger>
                    <SelectContent className="">
                        <SelectItem label="Credit" value="Credit" >Credit</SelectItem>
                        <SelectItem label="Debit" value="Debit" >Debit</SelectItem>
                        <SelectItem label="Cash" value="Cash" >Cash</SelectItem>
                    </SelectContent>
                </Select>
            </View>
            <View className="flex gap-1">
                <Label>Purchase Description</Label>
                <Input value={description} onChangeText={(value) => setDescription(value)} placeholder="Additional info about the purchase"/>
            </View>
            <Button className="self-end" onPress={createTransaction}>
                <Text>Confirm</Text>
            </Button>
        </View>
        // <Modal visible={props.visible} animationType="slide" transparent>
        //     <View className="pt-safe h-full flex justify-end">
        //         <View className="bg-secondary h-3/4">
        //             <View className="w-full flex-row items-center justify-end">
        //                 <Button variant={'ghost'} onPress={() => props.setModalOpen(false)} >
        //                     <Text>Cancel</Text>
        //                 </Button>
        //             </View>
        //             <View className="px-6">
        //                 <MoneyInput 
        //                     value={props.inputValue} 
        //                     onChangeText={props.onInputChange} 
        //                     className="flex items-center border-b-2 w-full border-white" 
        //                     textClassName="font-bold text-7xl" 
        //                     cursorClassName="text-7xl"/>
        //                 <Select defaultValue={{value: 'Credit', label: 'Credit'}}>
        //                     <SelectTrigger>
        //                         <SelectValue placeholder="Select a transaction type" />
        //                     </SelectTrigger>
        //                     <SelectContent className="z-40 bg-white">
        //                         <SelectItem label="Credit" value="Credit" >Credit</SelectItem>
        //                         <SelectItem label="Debit" value="Debit" >Debit</SelectItem>
        //                         <SelectItem label="Cash" value="Cash" >Cash</SelectItem>
        //                     </SelectContent>
        //                 </Select>
        //             </View>
        //         </View>
        //     </View>
        // </Modal>
    )
})