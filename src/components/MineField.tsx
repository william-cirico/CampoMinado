import { View, StyleSheet } from "react-native";
import { Field } from "./Field";

type Props = {
    board: any;
}

export function MineField({ board }: Props) {
    const rows = board.map((row, rowIndex) => {
        const columns = row.map((field, fieldIndex) => (
            <Field {...field} key={fieldIndex} />
        ));

        return <View key={rowIndex} style={styles.row}>{columns}</View>
    });

    return (
        <View>
            {rows}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    }
});