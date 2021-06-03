import React from 'react';

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {StackNavigator} from './StackNavigator';
import {HomeScreen} from '../screens/HomeScreen';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../theme/appTheme';
import {Button} from 'react-native-paper';

const Drawer = createDrawerNavigator();

export const MenuLeft = () => {
  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'right'}}
      drawerContent={props => <ContenidoMenu {...props} />}>
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen
        name="Stack"
        component={StackNavigator}
        options={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const ContenidoMenu = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        borderLeftColor: '#EC534299',
        borderLeftWidth: 3,
      }}>
      <View style={styles.menuContainer}>
        <View style={styles.MenuBtnOpciones}>
          <Button
            mode="text"
            theme={{colors: {primary: '#EC534210'}}}
            onPress={() => {}}>
            <Text style={styles.menuTexto}>Crear Solicitud</Text>
          </Button>
          <View style={{borderTopWidth: 1, borderTopColor: '#AE1E1E99'}} />
          <Button
            mode="text"
            theme={{colors: {primary: '#EC534210'}}}
            onPress={() => {}}>
            <Text style={styles.menuTexto}>Ver Historial</Text>
          </Button>
        </View>
        <View style={styles.MenuBtnLogOut}>
          <Button mode="outlined" theme={{colors: {primary: '#EC534270'}}}>
            <Text style={[styles.menuTexto, {color: '#AE1E1E'}]}>
              Cerrar Sesión
            </Text>
          </Button>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
