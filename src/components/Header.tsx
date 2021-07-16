import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Props {
  pageName?: string;
  userName?: string;
  ProgressCircle?: any;
  roleUser?: string
}

export const Header = ({ pageName, userName, ProgressCircle, roleUser }: Props) => {
  const isWelcomePage = pageName === 'Bienvenido';
  const isFormSolicitud = pageName === 'Nueva Solicitud';
  pageName = pageName == 'Solicitud' ? 'Informe de solicitud' : pageName;
  const isTecnico = roleUser == 'tecnico';
  const paddingHeader = isWelcomePage ? isTecnico ? 0 : 10 : 0;
  const flexDHeader = isWelcomePage ? 'column' : 'row';
  const heightPage = isTecnico ? '20%' : '30%';

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
          theme={{
            colors: {
              primary: '#6565C7'
            }
          }}
          style={{
            height: windowHeight * 0.13, backgroundColor: '#6565C7'
          }}>
          < Appbar.BackAction
            color="#101010"
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
            color="black"
            size={windowHeight * 0.038}
            onPress={_openMenu}
          />
        </Appbar.Header>
      ) : (
        <>
          <Appbar.Header style={{ elevation: 0 }}>
            <View
              style={{
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                marginLeft: '86%',
              }}>
              <Appbar.Action
                icon="menu"
                color="black"
                size={windowHeight * 0.035}
                onPress={_openMenu}
                style={{ justifyContent: 'flex-end' }}
              />
            </View>
          </Appbar.Header>
          <View
            // colors={['#6565C7', '#6565C7']}
            //'#F76656', '#F76656',

            style={{ height: heightPage, backgroundColor: '#454DD9' }}>
            <View
              style={{
                paddingLeft: paddingHeader,
                paddingTop: paddingHeader,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 20,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}>
              <View style={{ marginHorizontal: 15 }}>
                <View style={{ flexDirection: flexDHeader }}>
                  {PageName(pageName)}
                  {isWelcomePage ? WelcomeHeader(userName, isTecnico) : null}
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

const PageName = (name: string) => {
  return (
    <View>
      <Text
        style={{
          color: 'white',
          fontSize: 0.09 * windowWidth,
          fontWeight: '400',
          textShadowRadius: 10,
        }}>
        {name}
      </Text>
    </View>
  );
};

const WelcomeHeader = (username: string, isTecnico) => {
  return (
    <View
      style={{
        marginTop: isTecnico ? 15 : 5,
      }}>
      <Text
        style={{
          color: '#E8E6F5',
          fontSize: isTecnico ? 0.03 * windowHeight : 0.08 * windowWidth,
          fontWeight: isTecnico ? '100' : 'bold',
          textShadowRadius: 1,
        }}>
        {isTecnico ? 'Jueves 15 Julio' : username}
      </Text>
      { }
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 0.07 * windowWidth,
          fontWeight: '800',
          textShadowRadius: 1,
        }}>
        {isTecnico ? null : 'Santander Rio'}
      </Text>
    </View>
  );
};
