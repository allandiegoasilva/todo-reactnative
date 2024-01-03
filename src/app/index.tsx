import { Link, Stack } from "expo-router";
import { theme } from "../theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Container from "../component/container";
import { ReadTask } from "../backend/action/read-task";
import { useEffect, useState } from "react";
import { TaskDto } from "../backend/dto/task-dto";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { DeleteTask } from "../backend/action/delete-task";

type TaskListDto = TaskDto & {
  selected: boolean;
};

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
    height: "100%",
    gap: 15,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.accent,
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    flexGrow: 1,
  },
});

export default function App() {
  const [tasks, setTasks] = useState<TaskListDto[]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean>(false);

  async function loadTasks() {
    const action = new ReadTask();
    let loaded: TaskDto[] | TaskListDto[] = await action.execute();
    loaded = loaded.map((task: TaskDto) => ({ ...task, selected: false }));
    setTasks(loaded as TaskListDto[]);
  }

  function handlePressable(param: TaskListDto) {
    const items = tasks.map((task) => {
      if (task.id != param.id) return task;

      task.selected = !param.selected;

      return task;
    });

    const task = items.find((task) => task.selected == true);
    setSelectedItems(task ? true : false);
    setTasks(items);
  }

  function handleClick(param: TaskListDto) {
    if (!selectedItems) return router.push("/todo/" + param.id);

    handlePressable(param);
  }

  async function removeTask() {
    const selectedTasks = tasks.filter((task) => task.selected == true);

    const ids: number[] = selectedTasks.map((task) => Number(task.id));

    const action = new DeleteTask();
    await action.execute(ids);

    setSelectedItems(false);
    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Tarefas",
        }}
      />

      <Container>
        <Link
          href={"/todo/create"}
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            backgroundColor: theme.colors.primary,
            borderRadius: 360,
          }}
          asChild
        >
          <AntDesign name="pluscircleo" size={60} color={theme.colors.white} />
        </Link>
        {selectedItems && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <Pressable onPress={removeTask}>
              <View
                style={{
                  padding: theme.padding,
                  borderRadius: theme.borderRadius,
                  backgroundColor: "red",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <Feather name="trash" size={15} color={theme.colors.white} />
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: theme.fontSize.md,
                  }}
                >
                  Remover Selecionados
                </Text>
              </View>
            </Pressable>
          </View>
        )}

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
        {tasks.length > 0 && (
          <FlashList
            drawDistance={15}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item: task }: { item: TaskListDto }) => {
              return (
                <Pressable
                  onPress={() => handleClick(task)}
                  onLongPress={() => handlePressable(task)}
                  style={{ flex: 1, flexDirection: "row", width: "100%" }}
                >
                  <View
                    style={{
                      ...styles.card,
                      borderColor: task?.selected
                        ? theme.colors.primary
                        : theme.colors.muted,
                    }}
                  >
                    <Text style={{ color: theme.colors.white }}>
                      {task.title}
                    </Text>
                    <Text style={{ color: theme.colors.accent }}>
                      {task?.description?.slice(30)}...
                    </Text>
                  </View>
                </Pressable>
              );
            }}
            estimatedItemSize={100}
            data={tasks}
          />
        )}
      </Container>
    </>
  );
}
