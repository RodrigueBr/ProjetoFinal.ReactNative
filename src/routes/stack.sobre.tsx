import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Sobre from '../screens/Sobre'

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen
                name='Sobre'
                component={Sobre}
            />
        </Stack.Navigator>
    )
}