import { Link, Stack } from "expo-router";
import { theme } from "../theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Container from "../component/container";
import { ReadTask } from "../backend/action/read-task";
import { useEffect, useState } from "react";
import { TaskDto } from "../backend/dto/task-dto";
import { FlashList } from "@shopify/flash-list";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
    maxHeight: 250,
    maxWidth: 250,
  },
  empty: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.accent,
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});

export default function App() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [pressed, setPressed] = useState<number[]>([]);

  async function loadTasks() {
    const action = new ReadTask();
    const loaded = await action.execute();
    setTasks(loaded);
  }

  function handlePressable(id: number | undefined) {
    console.log("AQUI: ", id);
    if (!id) return;

    let items : number[] = [];
    
    if (pressed.includes(id))
      items = pressed.filter((i) => i != id);
    else 
      items = [...pressed, id];

    setPressed(items);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Tarefas",
          headerRight: () => (
            <Link href={"/todo/create"} asChild>
              <AntDesign
                name="pluscircleo"
                size={30}
                color={theme.colors.primary}
              />
            </Link>
          ),
        }}
      />
      <Container>
        {tasks.length == 0 && (
          <View style={styles.empty}>
            <Ionicons
              name="ios-rocket-outline"
              size={72}
              color={theme.colors.muted}
            />
            <Text
              style={{
                fontSize: theme.fontSize.xl,
                color: theme.colors.muted,
                fontWeight: "bold",
              }}
            >
              Muito bem, tudo está em ordem!
            </Text>
          </View>
        )}
        <FlashList
          drawDistance={15}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({
            item: { id, title, description },
          }: {
            item: TaskDto;
          }) => {
            return (
              <Pressable onLongPress={() => handlePressable(id)}>
                <View
                  style={{
                    ...styles.card,
                    borderColor: pressed.includes(id || 0)
                      ? theme.colors.primary
                      : theme.colors.muted,
                  }}
                >
                  <Text style={{ color: theme.colors.white }}>{title}</Text>
                </View>
              </Pressable>
            );
          }}
          estimatedItemSize={100}
          data={tasks}
        />
      </Container>
    </>
  );
}
