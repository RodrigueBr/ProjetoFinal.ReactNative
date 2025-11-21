import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import TabRoutes from './tab.routes';
import StackSobre from './stack.sobre';
import StackInicio from './stack.inicio';
import StackPerfil from './stack.perfil';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="PerfilDrawer"
        component={StackPerfil}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          drawerLabel: "Perfil",
          headerTitle: "Perfil",
        }}
      />
      <Drawer.Screen
        name="InicioDrawer"
        component={StackInicio}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          drawerLabel: "Início",
          headerTitle: "Início",
        }}
      />

      <Drawer.Screen
        name="SobreDrawer"
        component={StackSobre}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="alert-circle" color={color} size={size} />
          ),
          drawerLabel: "Sobre",
          headerTitle: "Sobre",
        }}
      />

      <Drawer.Screen
        name="EstudarDrawer"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="book" color={color} size={size} />
          ),
          drawerLabel: "Área de Estudos",
          headerTitle: "Área de Estudos",
        }}
      />
    </Drawer.Navigator>
  );
}
