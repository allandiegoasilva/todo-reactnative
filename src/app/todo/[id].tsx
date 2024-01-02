import { Stack } from "expo-router";
import { theme } from "../../theme";
import { StyleSheet, Text, View } from "react-native";
import Input from "../../component/input";
import Container from "../../component/container";
import Button from "../../component/button";
import { useEffect, useState } from "react";
import { TaskDto } from "../../backend/dto/task-dto";
import { useLocalSearchParams } from "expo-router";
import { UpdateTask } from "../../backend/action/update-task";
import { ReadTask } from "../../backend/action/read-task";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  const { id } = useLocalSearchParams();

  const [invalid, setInvalid] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const [form, setForm] = useState<TaskDto>({
    title: "",
    description: "",
  });

  async function update() {
    if (!form.title) {
      setInvalid(["title"]);
      return;
    }
    const action = new UpdateTask();
    await action.execute(id as any, {
      title: form.title,
      description: form.description,
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 999);
  }

  function handleChange(key: string, value: string) {
    setForm({ ...form, [key]: value });

    let items = invalid.filter((invalidItem) => invalidItem != key);
    setInvalid(items);
  }

  async function loadTask() {
    const action = new ReadTask();

    const result = await action.execute(Number(id));

    const task: TaskDto = result[0];

    setForm({
      title: task.title,
      description: task.description,
    });
  }

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Atualizar Tarefa",
        }}
      />
      <Container>
        {success && (
          <View
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.md,
                color: theme.colors.white,
                fontWeight: "bold",
              }}
            >
              Atualizado com sucesso!
            </Text>
          </View>
        )}
        <Input
          label="Título"
          value={form.title}
          onChangeText={(text) => handleChange("title", text)}
          invalid={invalid.includes("title")}
          errMsg="Informe o título"
          required
        />
        <Input
          label="Descrição"
          value={form.description}
          numberOfLines={10}
          onChangeText={(text) => setForm({ ...form, description: text })}
          multiline
        />
        <Button onPress={update} title="Atualizar" />
      </Container>
    </>
  );
}
