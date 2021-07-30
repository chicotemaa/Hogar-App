import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Props {
  pageName?: string;
  userName?: string;
  clienteName?: string | Promise<string>
  ProgressCircle?: any;
  roleUser?: string;
  id?: number;
}

export const Header = ({ pageName, userName, roleUser, clienteName }: Props) => {
  const isWelcomePage = pageName === 'Bienvenido';
  const isFormSolicitud = pageName === 'Nueva Solicitud';
  pageName = pageName == 'Solicitud' ? 'Informe de solicitud' : pageName;
  const isTecnico = roleUser == 'tecnico';
  const paddingHeader = isWelcomePage ? isTecnico ? 0 : 10 : 0;
  const flexDHeader = isWelcomePage ? 'column' : 'row';
  const heightPage = isTecnico ? '12%' : '30%';

  const navigation = useNavigation();
  const drawer: DrawerNavigationProp<any, any> = navigation.getParent();

  const _goBack = () => navigation.goBack();

  const _openMenu = () => {
    drawer.openDrawer();
  };
  return (
    <>
      {!isWelcomePage ? (
        <Appbar.Header
          style={{
            height: windowHeight * 0.12
          }}>
          < Appbar.BackAction
            color="white"
            onPress={_goBack}
            size={windowHeight * 0.035}
          />
          <Appbar.Content
            color="white"
            title={pageName}
            titleStyle={{ fontSize: windowHeight * 0.037 }}
            subtitle={isFormSolicitud ? 'Complete los datos necesarios' : null}
          />

          <Appbar.Action
            icon="menu"
            color="white"
            size={windowHeight * 0.038}
            onPress={_openMenu}
          />
        </Appbar.Header>
      ) : (
        <>
          <Appbar.Header style={{ marginTop: 0.04 * windowHeight }}>
            <Appbar.Content
              color="white"
              title={pageName}
              titleStyle={{ textAlign: 'auto', borderWidth: 1, fontSize: windowHeight * 0.05, }}
              subtitle={isFormSolicitud ? 'Complete los datos necesarios' : null}
            />
            <View>
              <Appbar.Action
                icon="menu"
                color="white"
                size={windowHeight * 0.05}
                onPress={_openMenu}
              />
            </View>
          </Appbar.Header>
          <View
            // colors={['#6565C7', '#6565C7']}
            //'#F76656', '#F76656',
            style={{ height: heightPage, backgroundColor: '#ef4920' }}>
            <View
              style={{
                paddingTop: paddingHeader,
              }}>
              <View style={{ marginHorizontal: 5 }}>
                <View style={{ flexDirection: flexDHeader }}>
                  {/* {PageName(pageName)} */}
                  {isWelcomePage ? WelcomeHeader(userName, isTecnico, clienteName) : null}
                </View>
              </View>
            </View>
          </View>
        </>
      )
      }
    </>
  );
};



const getCurrentDate = () => {
  return new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
}




const WelcomeHeader = (username: string, isTecnico: boolean, clienteName: string) => {
  return (
    <View
      style={{
        marginTop: isTecnico ? 19 : 10,
      }}>
      <Text
        style={{
          color: '#E8E6F5',
          fontSize: isTecnico ? 0.03 * windowHeight : 0.08 * windowWidth,
          fontWeight: isTecnico ? '300' : 'bold',
          textAlign: 'center',
          textTransform: 'capitalize'
        }}>
        {isTecnico ? getCurrentDate() : username}
      </Text>
      { }
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 0.07 * windowWidth,
          fontWeight: '600',
          textAlign: 'center',
          marginTop: 0.05 * windowHeight,
        }}>
        {isTecnico ? null : clienteName}
      </Text>
    </View>
  );
};
