import React from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {windowWidth} from '../../App';
import {styles} from '../theme/appTheme';

interface Props {
  pageName?: string;
  userName?: string;
  id?: string;
  title?: string;
  fecha?: string;
}

export const Header = ({pageName, userName}: Props) => {
  const isWelcomePage = pageName === 'Bienvenido';
  pageName = pageName == 'Solicitud' ? 'Informe de solicitud' : pageName;
  const paddingHeader = isWelcomePage ? 10 : 0;
  const flexDHeader = isWelcomePage ? 'column' : 'row';
  const heightPage = pageName === 'Bienvenido' ? '35%' : '17%';

  //backgroundColor: '#EC5342',
  return (
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
  );
};

const PageName = (name: string) => {
  return (
    <View>
      <Text
        style={{
          marginTop: 35,
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
