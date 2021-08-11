import React, { PureComponent } from 'react';
import { View } from 'react-native';

import Step from './Solicitud/Step';

class Wizard extends PureComponent {
  static Step = props => <Step {...props} />;

  state = {
    index: 0,
  };

  _nextStep = () => {
    if (this.state.index !== this.props.children.lenght - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1,
      }));
    }
  };

  _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
      }));
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {React.Children.map(this.props.children, (element, index) => {
          if (index === this.state.index) {
            return React.cloneElement(element, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              isLast: this.state.index === this.props.children.length - 1,
            });
          }
          return null;
        })}
      </View>
    );
  }
}

export default Wizard;
