import { theme } from "../theme";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          color: theme.colors.white,
        },
      }}
    />
  );
}
