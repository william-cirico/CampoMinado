import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { Header } from './src/components/Header';
import { MineField } from './src/components/MineField';
import { cloneBoard, createMinedBoard, hasExploded, invertFlag, openField, won } from './src/utils/board';

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
    50));

  const onOpenField = (row, column) => {
    // Para conseguir atualizar o tabuleiro (é necessário atualizar o estado)
    const clonedBoard = cloneBoard(board);

    openField(clonedBoard, row, column);
    setBoard(clonedBoard);

    if (hasExploded(clonedBoard)) {
      Alert.alert("Falha", "Tente novamente.");
      setBoard(createMinedBoard(
        getRowsAmount(),
        getColumnsAmount(),
        50));
      return;
    }

    if (won(clonedBoard)) {
      Alert.alert("Sucesso!");
    }
  };

  const onSelectField = (row, column) => {
    const clonedBoard = cloneBoard(board);

    invertFlag(clonedBoard, row, column);

    setBoard(clonedBoard);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MineField
        board={board}
        onOpenField={onOpenField}
        onSelectField={onSelectField}
      />
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
