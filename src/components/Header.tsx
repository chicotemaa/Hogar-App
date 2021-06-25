import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Appbar} from 'react-native-paper';
import {windowWidth, windowHeight} from '../../App';
import {DrawerNavigationProp} from '@react-navigation/drawer';

interface Props {
  pageName?: string;
  userName?: string;
}

export const Header = ({pageName, userName}: Props) => {
  const isWelcomePage = pageName === 'Bienvenido';
  pageName = pageName == 'Solicitud' ? 'Informe de solicitud' : pageName;
  const paddingHeader = isWelcomePage ? 10 : 0;
  const flexDHeader = isWelcomePage ? 'column' : 'row';
  const heightPage = '30%';

  const navigation = useNavigation();
  const drawer: DrawerNavigationProp<any, any> = navigation.getParent();

  const _goBack = () => navigation.goBack();

  const _openMenu = () => {
    drawer.openDrawer();
  };
  return (
    <>
      {!isWelcomePage ? (
        <Appbar.Header style={{height: windowHeight * 0.13}}>
          <Appbar.BackAction
            color="#101010"
            onPress={_goBack}
            size={windowHeight * 0.035}
          />
          <Appbar.Content
            color="white"
            title={pageName}
            titleStyle={{fontSize: windowHeight * 0.037}}
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
          <Appbar.Header style={{elevation: 0}}>
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
                style={{justifyContent: 'flex-end'}}
              />
            </View>
          </Appbar.Header>
          <LinearGradient
            colors={['#F76656', '#F76656']}
            style={{height: heightPage}}>
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
              <View style={{marginHorizontal: 15}}>
                <View style={{flexDirection: flexDHeader}}>
                  {PageName(pageName)}
                  {isWelcomePage ? WelcomeHeader(userName) : null}
                </View>
              </View>
            </View>
          </LinearGradient>
        </>
      )}
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

const WelcomeHeader = (username: string) => {
  return (
    <View
      style={{
        marginTop: 5,
      }}>
      <Text
        style={{
          color: '#313030',
          fontSize: 0.08 * windowWidth,
          fontWeight: 'bold',
          textShadowRadius: 1,
        }}>
        {username}
      </Text>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 0.07 * windowWidth,
          fontWeight: '800',
          textShadowRadius: 1,
        }}>
        Santander Rio
      </Text>
    </View>
  );
};
