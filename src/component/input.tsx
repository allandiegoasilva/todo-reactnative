import { theme } from "../theme";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface IInput extends TextInputProps {
  label?: string;
  required?: boolean;
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.gap,
    width: "100%",
  },
  input: {
    padding: 10,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.accent,
    color: theme.colors.white,
    textAlignVertical: "top",
  },
  label: {
    color: theme.colors.white,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    gap: theme.gap,
  },
});

export default function Input({ label, required, ...props }: IInput) {
  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        <Text style={style.label}>{label}</Text>
        {required && <Text style={{ color: "red" }}>*</Text>}
      </View>
      <TextInput style={style.input} {...props} />
    </View>
  );
}
