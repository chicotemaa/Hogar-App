import React, { PureComponent } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { theme } from '../theme/appTheme';

type PropsType = {
  isOT?: boolean;
  index?: number;
};

export class TransitionView extends PureComponent<PropsType> {
  render() {
    const { index, isOT, ...rest } = this.props;
    return (
      <Animatable.View
        animation="fadeIn"
        duration={theme.transitionDuration}
        delay={index ? (index * theme.transitionDuration) / 5 : 0}
        useNativeDriver
        {...rest}
      />
    );
  }
}
