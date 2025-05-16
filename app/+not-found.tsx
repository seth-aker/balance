import { Text } from '@/components/ui/Text'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function NotFoundScreen() {
    return (
        <View className="w-full h-full">
            <Text>Oops. This screen does not exist.</Text>
            <Link href={'/'}>
                <Text>Return home</Text>
            </Link>
        </View>
    )
}