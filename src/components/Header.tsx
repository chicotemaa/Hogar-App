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

export const Header = ({pageName, id, title, fecha, userName}: Props) => {
  const isWelcomePage = pageName === 'Bienvenido';
  pageName = pageName == 'Solicitud' ? 'Informe de solicitud' : pageName;
  const heightHeader = 1;
  const paddingHeader = isWelcomePage ? 10 : 0;
  const flexDHeader = isWelcomePage ? 'column' : 'row';

  //backgroundColor: '#EC5342',
  return (
    <LinearGradient
      colors={[
        '#ec5342',
        '#EC5342',
        '#EC5342',
        '#F05443',
        '#D64B3C',
        '#BF4336',
      ]}
      style={{flex: heightHeader}}>
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
            <Text
              style={{
                color: 'white',
                fontSize: 0.08 * windowWidth,
                fontWeight: 'bold',
                textShadowRadius: 10,
              }}>
              {isWelcomePage ? 'Hola!' : pageName}
            </Text>
            {isWelcomePage ? WelcomeHeader(userName) : null}
          </View>
        </View>
      </View>
    </LinearGradient>
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
