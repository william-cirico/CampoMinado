import { TouchableWithoutFeedback, View, StyleSheet, StyleProp, ViewStyle, Text } from "react-native";
import { Flag } from "./Flag";
import { Mine } from "./Mine";

type Props = {
    opened: boolean;
    mined: boolean;
    nearMines: number;
    exploded: boolean;
    flagged: boolean;
    onOpen: VoidFunction;
    onSelect: VoidFunction;
}

export function Field({ opened, mined, nearMines, exploded, flagged, onOpen, onSelect }: Props) {
    const fieldStyles: StyleProp<ViewStyle> = [styles.field];

    // Adicionando os estilos do campo
    if (opened) fieldStyles.push(styles.opened);
    if (exploded) fieldStyles.push(styles.exploded);
    if (!opened && !exploded) fieldStyles.push(styles.regular);

    // Customizando a cor da label
    let color = null;
    if (nearMines > 0) {
        if (nearMines === 1) color = "#2A28D7";
        if (nearMines === 2) color = "#2B520F";
        if (nearMines > 2 && nearMines < 6) color = "#F9060A";
        if (nearMines >= 6) color = "#F221A9";
    }

    return (
        <TouchableWithoutFeedback onPress={onOpen} onLongPress={onSelect}>
            <View style={fieldStyles}>
                {(!mined && opened && !!nearMines) && <Text style={[styles.label, { color }]}>{nearMines}</Text>}
                {(flagged && !opened) && <Flag />}
                {(mined && opened) && <Mine />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    field: {
        height: 30,
        width: 30,
        borderWidth: 5,
    },
    regular: {
        backgroundColor: "#999",
        borderLeftColor: "#CCC",
        borderTopColor: "#CCC",
        borderRightColor: "#333",
        borderBottomColor: "#333",
    },
    opened: {
        backgroundColor: "#999",
        borderColor: "#777",
        alignItems: "center",
        justifyContent: "center",
    },
    exploded: {
        backgroundColor: "red",
        borderColor: "red",
    },
    label: {
        fontWeight: "bold",
        fontSize: 15,
    },
});