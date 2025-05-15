import FlashingCursor from "@/components/FlashingCursor";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { formatDollarValue } from "@/utils/formatDollarValue";
import { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export default function Index() {
  const inputRef = useRef<TextInput>(null)
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const onInputChange = (text: string) => {
    const cleanedInput = text.replace(/^\$0*|\./g, ''); // Remove non-digit characters
    setInputValue(cleanedInput);
  }
    return (
      <View className="flex justify-center items-center h-full w-full p-6">
        <Text className="color-white font-normal p-2">Input an amount:</Text>
        <Pressable className="flex items-center border-b-2 w-full border-white" onPress={() => inputRef.current?.focus()}>
          <View className="flex-row flex items-center justify-center">
            <Text className="font-bold color-white text-7xl">{formatDollarValue(inputValue)}</Text>
            {isFocused ? <FlashingCursor className="text-7xl color-white" /> : <Text className="text-7xl color-white">{" "}</Text>}
          </View>
          <TextInput 
            value={inputValue}
            onChangeText={onInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
            inputMode="numeric"
            className="opacity-0 absolute" 
            returnKeyType="done"/>
        </Pressable>
        <Button className="m-2" size='lg' variant='default' >
          <Text>Confirm</Text>
        </Button>
      </View>
    );
}
