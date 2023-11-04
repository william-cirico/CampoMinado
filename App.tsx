import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Field } from './src/components/Field';
import { Header } from './src/components/Header';
import { useState } from 'react';

export default function App() {
  const [board, setBoard] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Field mined={false} opened nearMines={1} exploded={false} flagged={false} />
      <Field mined={true} opened nearMines={0} exploded={true} flagged={false} />
      <Field mined={true} opened={false} nearMines={0} exploded={false} flagged={true} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
