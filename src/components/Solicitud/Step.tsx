import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import { windowHeight } from '../../../App';
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
            <View style={styles.content}>{this.props.children}</View>
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
    height:300
  },
  content:{
    height:windowHeight,
    marginBottom:100
  }
});
