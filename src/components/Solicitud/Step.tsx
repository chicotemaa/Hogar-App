import React, {PureComponent} from 'react';
import {Button, View} from 'react-native';
import {HeaderWithSteps} from './HeaderWithSteps';

class Step extends PureComponent {
  state = {};

  render() {
    return (
      <>
        <HeaderWithSteps
          page={this.props.currentIndex}
          subtitle={this.props.children}
        />
        <View>
          <Button
            title="Next"
            disabled={this.props.isLast}
            onPress={() => {
              console.log(this.props);
              this.props.nextStep();
            }}
          />
          <Button
            title="Prev"
            disabled={this.props.currentIndex === 0}
            onPress={this.props.prevStep}
          />
        </View>
      </>
    );
  }
}

export default Step;
