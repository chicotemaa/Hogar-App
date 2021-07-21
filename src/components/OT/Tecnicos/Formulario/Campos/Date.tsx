import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DateInput = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
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
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View>
                <Button onPress={showTimepicker} title="Show time picker!" />
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