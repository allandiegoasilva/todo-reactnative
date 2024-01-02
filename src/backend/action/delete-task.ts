import { Database } from "../infra/database";

export class DeleteTask {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  async execute(ids: number[]) {
    let values = ids.join(",");
    const results = await this.database.query(
      `DELETE FROM tasks WHERE id IN (${values})`,
    );
  }
}
