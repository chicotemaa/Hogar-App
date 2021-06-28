import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {HeaderWithSteps} from './HeaderWithSteps';

class Step extends PureComponent {
  state = {};

  render() {
    return (
      <View>
        <View>
          <View style={styles.container}>
            <View>
              <HeaderWithSteps page={this.props.currentIndex} />
            </View>
            <View>{this.props.children}</View>
          </View>
        </View>
      </View>
    );
  }
}

export default Step;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 15,
    elevation: 10,
  },
});
