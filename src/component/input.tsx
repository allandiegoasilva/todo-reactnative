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
  invalid?: boolean;
  errMsg?: string;
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

export default function Input({
  label,
  invalid,
  errMsg,
  required,
  ...props
}: IInput) {
  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        <Text style={style.label}>{label}</Text>
        {required && <Text style={{ color: theme.colors.primary }}>*</Text>}
      </View>
      <TextInput
        style={{
          ...style.input,
          borderWidth: 2,
          borderColor: invalid ? theme.colors.primary : "transparent",
        }}
        {...props}
      />
      {invalid && (
        <Text style={{ color: theme.colors.primary, fontWeight: "800" }}>
          {errMsg}
        </Text>
      )}
    </View>
  );
}
