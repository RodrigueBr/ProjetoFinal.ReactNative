import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Inicio from '../screens/Inicio'

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen
                name='Inicio'
                component={Inicio}
            />
        </Stack.Navigator>
    )
}