import MoneyInput from "@/components/MoneyInput";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { View } from "react-native";

export default observer(function Index() {
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (text: string) => {

    setInputValue(text)
  }
    return (
      <View className="flex justify-center items-center h-full w-full p-6 ">
        <Text className="color-white font-normal p-2">Input an amount:</Text>
        <MoneyInput 
          value={inputValue} 
          onChangeText={onInputChange} 
          className="flex items-center border-b-2 w-full border-white" 
          textClassName="font-bold text-7xl" 
          cursorClassName="text-7xl"/>
        <Button className="m-2" size='lg' >
          <Text>Confirm</Text>
        </Button>
      </View>
    );
})
