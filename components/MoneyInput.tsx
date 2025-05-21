import { Text } from '@/components/ui/Text';
import { cn } from '@/utils/cn';
import { formatDollarValue } from "@/utils/formatDollarValue";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import FlashingCursor from "./FlashingCursor";
export interface MoneyInputProps extends TextInputProps {
    textClassName?: string,
    cursorClassName?: string
}
export default observer(function MoneyInput(props: MoneyInputProps) {
    const inputRef = useRef<TextInput>(null)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const textClassName = cn(['text-foreground', props.textClassName])
    const cursorClassName = cn(['text-foreground', props.cursorClassName])
    return (
        <Pressable className={props.className} onPress={() => inputRef.current?.focus()} >
          <View className="flex-row flex items-center">
            <Text className={textClassName}>{formatDollarValue(props.value)}</Text>
            {isFocused ? <FlashingCursor className={cursorClassName} /> : <Text className={cursorClassName}>{" "}</Text>}
          </View>
          <TextInput 
            value={props.value}
            onChangeText={props.onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
            inputMode="numeric"
            className="opacity-0 absolute" 
            returnKeyType="done"/>
        </Pressable>
    )
})