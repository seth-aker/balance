import { useStores } from "@/store/helpers/useStores";
import { TTransactionType } from "@/store/models/Transaction";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { View, ViewProps } from "react-native";
import { v4 as uuid } from 'uuid';
import MoneyInput from "../MoneyInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";

export interface NewTransactionFormModalProps extends ViewProps {
    inputValue: string
    onInputChange: (value: string) => void
}
export default observer(function NewTransactionFormModal(props: NewTransactionFormModalProps) {
    const {userStore, transactionStore} = useStores();
    const [description, setDescription] = useState('');
    const [type, setType] = useState<TTransactionType>('Debit')
    const selectOption = {value: type, label: type}
    const createTransaction = () => {
        const transactionAmountCents = Number.parseInt(props.inputValue);
        if(type === 'Credit'){
            transactionStore.addPendingTransaction({
                id: uuid(),
                amountCents: transactionAmountCents, 
                createdBy: userStore.userId,
                description: description,
                createdOn: Date.now(),
                type: type,
                paid: false,
            })
        } else {
            transactionStore.addAppliedTransaction({
                id: uuid(),
                amountCents: transactionAmountCents,
                createdBy: userStore.userId,
                description,
                createdOn: Date.now(),
                type,
                paid: true
            })
            const newBalanceCents = transactionStore.bankBalanceCents - transactionAmountCents
            transactionStore.setProp('bankBalanceCents', newBalanceCents)
        }
    }
    return (
        <View className={cn('h-full', props.className)}>
            <MoneyInput 
                value={props.inputValue} 
                onChangeText={props.onInputChange} 
                className="flex items-center border-b-2 w-full border-white" 
                textClassName="font-bold text-7xl" 
                cursorClassName="text-7xl"/>
            <Select defaultValue={{value: 'Credit', label: 'Credit'}}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a transaction type" />
                </SelectTrigger>
                <SelectContent className="z-40 bg-white">
                    <SelectItem label="Credit" value="Credit" >Credit</SelectItem>
                    <SelectItem label="Debit" value="Debit" >Debit</SelectItem>
                    <SelectItem label="Cash" value="Cash" >Cash</SelectItem>
                </SelectContent>
            </Select>
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