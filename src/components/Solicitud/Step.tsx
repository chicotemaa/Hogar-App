import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { windowHeight, windowWidth } from '../../../App';
import {HeaderWithSteps} from './HeaderWithSteps';

class Step extends PureComponent {
  state = {};

  render() {
    return (
      <View style={{borderWidth:1}}>        
          <View style={styles.container}>
            <View>
              <HeaderWithSteps page={this.props.currentIndex} />
            </View>
            <View style={styles.content}>{this.props.children}</View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <TouchableOpacity style={styles.buttonStep} onPress={this.props.prevStep}>
                <Text>Atras</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStep} onPress={this.props.nextStep}>
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
    marginVertical: 20,
    marginHorizontal: 1,
    elevation: 10,    
    height:windowHeight*0.7
  },
  content:{
    flex:1,
    backgroundColor:'#FFFFFF',
    height:'50%',
    borderWidth:1,
  },
  buttonStep:{
    backgroundColor:'orange',
    marginHorizontal:5,
    borderRadius:5,
    width: windowWidth*0.4,
    justifyContent:'center',
    alignItems:'center',
    height:windowHeight*0.06
  }
});
