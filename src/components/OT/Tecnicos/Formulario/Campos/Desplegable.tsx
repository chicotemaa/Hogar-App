import React from 'react';
import { List } from 'react-native-paper';

export const Desplegable = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion title="Desplegable">
        <List.Item title="Primera opcion" />
        <List.Item title="Segunda opcion" />
      </List.Accordion>
    </List.Section>
  );
};
