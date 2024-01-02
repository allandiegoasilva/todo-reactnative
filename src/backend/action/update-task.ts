import { TaskDto } from "../dto/task-dto";
import { Database } from "../infra/database";

export class UpdateTask {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  async execute(id: number, task: TaskDto) {
    await this.database.query(
      `UPDATE tasks SET title = ?, description = ? WHERE id = ?`,
      [task.title, task.description, id],
    );
  }
}
