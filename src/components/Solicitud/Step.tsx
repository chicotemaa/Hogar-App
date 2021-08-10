import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {windowHeight, windowWidth} from '../../../App';
import {HeaderWithSteps} from './HeaderWithSteps';

class Step extends PureComponent {
  state = {};

  render() {
    console.log(this.props);
    const {isLast} = this.props;
    console.log('es ultimo', isLast);
    return (
      <View>
        <View style={styles.container}>
          <View>
            <HeaderWithSteps page={this.props.currentIndex} />
          </View>
          <View style={styles.content}>{this.props.children}</View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.buttonStep}
              onPress={this.props.prevStep}>
              <Text>Atras</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStep}
              onPress={this.props.nextStep}>
              <Text>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Step;

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    height: windowHeight,
    backgroundColor: 'white',
  },
  content: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: '75%',
  },
  buttonStep: {
    marginVertical: 10,
    backgroundColor: 'orange',
    marginHorizontal: 5,
    borderRadius: 5,
    width: windowWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.06,
  },
});
