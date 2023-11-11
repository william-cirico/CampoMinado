import { View, StyleSheet } from "react-native";
import { Field } from "./Field";

type Props = {
    board: any;
    onOpenField: (row: any, column: any) => void;
    onSelectField: (row: any, column: any) => void;
}


export function MineField({ board, onOpenField, onSelectField }: Props) {
    const rows = board.map((row, rowIndex) => {
        const columns = row.map((field, fieldIndex) => (
            <Field onSelect={() => onSelectField(field.row, field.column)} onOpen={() => onOpenField(field.row, field.column)} {...field} key={`field-${fieldIndex}`} />
        ));

        return <View key={`row-${rowIndex}`} style={styles.row}>{columns}</View>
    });

    return (
        <View style={styles.container}>
            {rows}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    container: {
        alignItems: "center",
    }
});