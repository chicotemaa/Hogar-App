import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface DatePickerProps {
    modo:'date' | 'time' | 'completo'
} 

export const DateInput = ({modo}:DatePickerProps) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

   

    return (
        <View>
            <View style={{backgroundColor:'#f2f2f2'}}>
                {
                    modo === 'date' ? 
                    (<IconButton
                        icon="calendar"
                        color={'#767676'}
                        size={25}
                        onPress={showDatepicker}
                    />) :
                    modo === 'time' ? 
                    (<IconButton
                        icon="clock"
                        color={'#767676'}
                        size={25}
                        onPress={showTimepicker}
                    />) :
                    (
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <IconButton
                                icon="calendar"
                                color={'#767676'}
                                size={25}
                                onPress={showDatepicker}
                            />
                            <IconButton
                                icon="clock"
                                color={'#767676'}
                                size={25}
                                onPress={showTimepicker}
                            />
                        </View>
                    )
                }                
            </View>
            
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:'grey',
        padding:10,
    }
})