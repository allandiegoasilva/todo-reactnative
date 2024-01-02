import { theme } from "../theme";
import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface IButton extends PressableProps {
  title?: string;
  loading?: boolean;
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: theme.borderRadius,
    borderColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
});

export default function Button({ title, loading, ...props }: IButton) {
  return (
    <Pressable {...props}>
      <View style={style.container}>
        {loading && (
          <Feather name="loader" size={24} color={theme.colors.white} />
        )}
        {title && <Text style={style.text}>{title}</Text>}
      </View>
    </Pressable>
  );
}
