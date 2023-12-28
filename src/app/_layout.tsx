import { theme } from "../theme";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.accent,
        },
        headerTitleStyle: {
          color: theme.colors.white,
        },
      }}
    />
  );
}
