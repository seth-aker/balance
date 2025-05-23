import NewTransactionForm from "@/components/forms/NewTransactionForm";
import MoneyInput from "@/components/MoneyInput";
import { Button } from "@/components/ui/Button";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { useStores } from "@/store/helpers/useStores";
import { formatDollarValue } from "@/utils/formatDollarValue";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { View } from "react-native";

export default observer(function Index() {
  const {transactionStore} = useStores();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (text: string) => {
    setInputValue(text)
  }
    return (   
      <View className="flex pt-safe items-center h-full w-full px-6">
        <View className="flex-row justify-between w-full border-b border-border">
          <Text className="text-xl">Current Balance</Text>
          <Text className="text-xl">{formatDollarValue(`${transactionStore.getBalanceActualCents}`)}</Text>
        </View>
        <View className="w-full h-3/4 justify-self-center items-center justify-center">
          <Text className="color-white font-normal p-2">Input an amount:</Text>
          <MoneyInput 
            value={inputValue} 
            onChangeText={onInputChange} 
            className="flex items-center border-b-2 w-full border-white" 
            textClassName="font-bold text-7xl" 
            cursorClassName="text-7xl"/>
          <Modal open={modalOpen} onOpenChange={(value) => setModalOpen(value)}>
            <ModalTrigger asChild>
              <Button className="m-2" size='lg' onPress={() => setModalOpen(true)} >
                <Text>Confirm</Text>
              </Button>
            </ModalTrigger>
            <ModalContent transparent className="h-3/4 flex justify-end">
                <NewTransactionForm className="bg-background" inputValue={inputValue} onInputChange={onInputChange} setModalOpen={setModalOpen} />
            </ModalContent>
          </Modal>
        </View>
      </View>
          
    );
})
