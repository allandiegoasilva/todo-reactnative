import { TaskDto } from "../dto/task-dto";
import { Database } from "../infra/database";

export class ReadTask {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  async execute(id?: number): Promise<TaskDto[]> {
    let query = "SELECT * FROM tasks";
    let params = undefined;

    if (id) {
      query += " WHERE id = ?";
      params = [id];
    }

    const results: any = await this.database.query(query, params);
    const rows: TaskDto[] = results["rows"]["_array"].map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
    }));

    return rows;
  }
}
