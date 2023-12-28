import { TaskDto } from "../dto/task-dto";
import { Database } from "../infra/database";

export class CreateTask {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  async create(task: TaskDto) {
    const a = await this.database.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [task.title, task.description],
    );

    return true;
  }
}
