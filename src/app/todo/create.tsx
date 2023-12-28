import { Stack } from "expo-router";
import { theme } from "../../theme";
import { StyleSheet } from "react-native";
import Input from "../../component/input";
import Container from "../../component/container";
import Button from "../../component/button";
import { useState } from "react";
import { TaskDto } from "../../backend/dto/task-dto";
import { CreateTask } from "../../backend/action/create-task";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  const [form, setForm] = useState<TaskDto>({
    title: "",
    description: "",
  });

  async function add() {
    console.log(form);
    const action = new CreateTask();
    await action.create(form);
    setForm({
      title: "",
      description: "",
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Criar Tarefa",
        }}
      />
      <Container>
        <Input
          label="Título"
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          required
        />
        <Input
          label="Descrição"
          value={form.description}
          numberOfLines={10}
          onChangeText={(text) => setForm({ ...form, description: text })}
          multiline
        />
        <Button onPress={add} title="Adicionar" />
      </Container>
    </>
  );
}
