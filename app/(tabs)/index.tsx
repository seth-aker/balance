import NewTransactionForm from "@/components/forms/NewTransactionForm";
import MoneyInput from "@/components/MoneyInput";
import { Button } from "@/components/ui/Button";
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { View } from "react-native";

export default observer(function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (text: string) => {

    setInputValue(text)
  }
    return (
      
      <View className="flex justify-center items-center h-full w-full px-6">
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
              <View className="w-full bg-secondary flex items-end">
                <ModalClose asChild>
                  <Button variant={'ghost'}>
                    <Text>Close</Text>
                  </Button>
                </ModalClose>
              </View>
              <NewTransactionForm className="bg-background" inputValue={inputValue} onInputChange={onInputChange} />
          </ModalContent>
        </Modal>
      </View>
          
    );
})
