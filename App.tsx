import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import { Field } from './src/components/Field';
import { Header } from './src/components/Header';
import { useState } from 'react';
import { createMinedBoard } from './src/utils/board';
import { MineField } from './src/components/MineField';

const getColumnsAmount = () => {
  const width = Dimensions.get("screen").width;
  return Math.floor(width / 30);
};

const getRowsAmount = () => {
  const height = Dimensions.get("screen").height;
  const boardHeight = height * (1 - 0.15); // Cálculo de Aspect Ratio = Altura total * (1 - porcentagem da tela)
  return Math.floor(boardHeight / 30);
};

export default function App() {
  const [board, setBoard] = useState(createMinedBoard(
    getRowsAmount(),
    getColumnsAmount(),
    10));

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MineField board={board} />
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
