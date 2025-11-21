import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Perfil from '../screens/Perfil'

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen
                name='Sobre'
                component={Perfil}
            />
        </Stack.Navigator>
    )
}