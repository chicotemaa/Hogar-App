import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { windowWidth, windowHeight } from '../../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Props {
  pageName?: string;
  userName?: string;
  ProgressCircle?: any;
  roleUser?: string;
  id?: number;
}

export const Header = ({ pageName, userName, roleUser, id }: Props) => {
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
          <Appbar.Header style={{ elevation: 0, marginTop: 0.04 * windowHeight }}>
            <Appbar.Content
              color="white"
              title={pageName}
              titleStyle={{ alignContent: 'center', fontSize: windowHeight * 0.05, }}
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

            style={{ height: heightPage, backgroundColor: '#32367A' }}>
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
              <View style={{ marginHorizontal: 5 }}>
                <View style={{ flexDirection: flexDHeader }}>
                  {/* {PageName(pageName)} */}
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

const getCurrentDate = () => {
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  console.log(date, month, year)


  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

  // return date.toLocaleString() + '-' + month + '-' + year;
  return new Date().toLocaleDateString('es-AR', options);
}




const WelcomeHeader = (username: string, isTecnico) => {
  return (
    <View
      style={{
        marginTop: isTecnico ? 19 : 10,
      }}>
      <Text
        style={{
          color: '#E8E6F5',
          fontSize: isTecnico ? 0.03 * windowHeight : 0.08 * windowWidth,
          fontWeight: isTecnico ? '100' : 'bold',
          textShadowRadius: 1,
          paddingLeft: isTecnico ? 16 : 0,
          textTransform: 'capitalize'
        }}>
        {isTecnico ? getCurrentDate() : username}
      </Text>
      { }
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 0.07 * windowWidth,
          fontWeight: '800',
          marginTop: 5,
          textShadowRadius: 1,
        }}>
        {isTecnico ? null : 'Santander Rio'}
      </Text>
    </View>
  );
};
