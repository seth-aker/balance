import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Text, TextProps } from 'react-native';

export default observer(function FlashingCursor(props: TextProps) {
    const [isVisible, setIsVisable] = useState<boolean>(true);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisable((prev)=> !prev)
        }, 500);
        return () => clearInterval(intervalId);
    },[]);

    return (
        <Text {...props}>{isVisible ? '|' : ' '}</Text>
    )
})