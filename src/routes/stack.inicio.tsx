import { createNativeStackNavigator } from '@react-navigation/native-stack'

import inicio from '../screens/inicio'

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen
                name='inicio'
                component={inicio}
            />
        </Stack.Navigator>
    )
}