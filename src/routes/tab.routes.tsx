import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Matematica from '../screens/Matematica';
import Salvos from '../screens/Salvos';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen
            name='Matematica'
            component={Matematica}
            options={{
                tabBarIcon: ({ color, size}) => <Feather name='percent' color={color} size={size} />,
                tabBarLabel: 'Matemática'
            }}
            />

            <Tab.Screen
            name='Salvos'
            component={Salvos}
            options={{
                tabBarIcon: ({ color, size}) => <Feather name='star' color={color} size={size} />,
                tabBarLabel: 'Salvos'
            }}
            />
        </Tab.Navigator>
    )
}