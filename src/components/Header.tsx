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
  const esDetalleSolicitud = id != null;
  const isSolicitudDetalle = pageName === 'Solicitud';
  const isWelcomePage = pageName === 'Bienvenido';
  const heightHeader = isSolicitudDetalle ? 3 : 1;
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
                fontSize: 0.1 * windowWidth,
                fontWeight: 'bold',
                textShadowRadius: 10,
              }}>
              {isWelcomePage ? 'Hola!' : pageName}
            </Text>
            {isWelcomePage ? WelcomeHeader(userName) : null}
            {isSolicitudDetalle ? (
              <Text
                style={{
                  color: '#473E3E',
                  fontSize: 0.09 * windowWidth,
                  fontWeight: 'bold',
                  paddingLeft: 10,
                  textShadowRadius: 1,
                }}>
                #{id}
              </Text>
            ) : null}
          </View>

          {esDetalleSolicitud ? DetalleSolicitudHeader({title, fecha}) : null}
        </View>
      </View>
    </LinearGradient>
  );
};
/*   */

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

const DetalleSolicitudHeader = ({title, fecha}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#C2C2C2',
          height: 3,
          marginBottom: 20,
          borderRadius: 10,
        }}
      />
      <View style={{justifyContent: 'space-between'}}>
        <View>
          <Seccion isDate={false} dato={title} />
        </View>
        <View
          style={{
            backgroundColor: '#C2C2C2',
            height: 3,
            marginTop: 2,
            marginBottom: 7,
            borderRadius: 10,
          }}
        />
        <View>
          <Seccion isDate={true} dato={fecha} />
        </View>
      </View>
    </View>
  );
};

const Seccion = ({dato, isDate}) => {
  return (
    <View>
      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 29,
          color: 'white',
          fontWeight: 'bold',
          textShadowRadius: 10,
        }}>
        {isDate ? 'Fecha' : 'Incidencia'}
      </Text>
      <View
        style={{
          height: 2,
          width: '70%',
          backgroundColor: '#141414',
          marginBottom: 2,
        }}
      />
      <Informacion dato={dato} />
    </View>
  );
};

const Informacion = ({dato}) => {
  return (
    <View>
      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 22,
          fontWeight: 'bold',
          color: 'black',
        }}>
        {dato}
      </Text>
    </View>
  );
};
