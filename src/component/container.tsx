import { theme } from "../theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: theme.colors.black,
    padding: 25,
    gap: 18,
  },
});

export default function Container({ children }: { children: ReactNode }) {
  return <View style={style.container}>{children}</View>;
}
