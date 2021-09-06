import React, { ComponentProps, useState } from 'react';
import { View, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconButton } from 'react-native-paper';
import { windowHeight } from '~/dimensions';
import { ItemTipo, PropiedadItem } from '~/api/types';

type AndroidMode = 'date' | 'time';

interface Props {
  propiedadItem: PropiedadItem;
}

export const DateInput = ({ propiedadItem }: Props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);

  const onChange: ComponentProps<typeof DateTimePicker>['onChange'] = (
    event: Event,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const FechaCompletaString = () => {
    return date ? (
      <Text style={{ alignSelf: 'center', fontSize: 0.023 * windowHeight }}>
        {date.toLocaleString()}
      </Text>
    ) : null;
  };

  const FechaString = () => {
    return date ? (
      <Text style={{ alignSelf: 'center', fontSize: 0.023 * windowHeight }}>
        {date.toLocaleDateString()}
      </Text>
    ) : null;
  };

  const HoraString = () => {
    return date ? (
      <Text style={{ alignSelf: 'center', fontSize: 0.023 * windowHeight }}>
        {date.toLocaleTimeString()}
      </Text>
    ) : null;
  };

  return (
    <View>
      <View style={{ backgroundColor: '#f2f2f2' }}>
        {propiedadItem.item.tipo === ItemTipo.DATE ? (
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="calendar"
              color={'#767676'}
              size={25}
              onPress={showDatepicker}
            />
            <FechaString />
          </View>
        ) : propiedadItem.item.tipo === ItemTipo.TIME ? (
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="clock"
              color={'#767676'}
              size={25}
              onPress={showTimepicker}
            />

            <HoraString />
          </View>
        ) : (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <IconButton
              icon="calendar"
              color={'#767676'}
              size={25}
              onPress={showDatepicker}
            />
            <FechaCompletaString />
            <IconButton
              icon="clock"
              color={'#767676'}
              size={25}
              onPress={showTimepicker}
            />
          </View>
        )}
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
