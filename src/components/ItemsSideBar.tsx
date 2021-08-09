import React, { useState } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { deleteItem, getToken } from '~/api/api';
import { styles } from '~/theme/appTheme';
import { StackActions } from '@react-navigation/native';

interface Props
  extends DrawerContentComponentProps<DrawerContentComponentProps> {
  isWelcome: boolean;
}

export const ItemsSideBar = ({ navigation, isWelcome }: Props) => {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <View style={styles.menuContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.MenuBtnOpciones}>
            <Button
              mode="text"
              theme={{ colors: { primary: '#32367A' } }}
              onPress={() => {
                navigation.navigate('Stack');
              }}>
              <Text style={styles.menuTexto}>Iniciar Sesión</Text>
            </Button>
            <View style={{ borderTopWidth: 1, borderTopColor: '#32367A' }} />
            {isWelcome ? (
              <Button>
                <Text>Holas</Text>
              </Button>
            ) : null}
          </View>
        </View>
        <Button
          mode="text"
          theme={{ colors: { primary: '#ef492010' } }}
          onPress={() => {
            deleteItem('access_token');
            navigation.closeDrawer();
            navigation.dispatch(StackActions.popToTop());
          }}>
          <Text style={styles.menuTexto}>Cerrar Sesión</Text>
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};
