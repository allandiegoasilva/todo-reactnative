import * as SQLite from "expo-sqlite";

export class Database {
  private db = SQLite.openDatabase("database.db");

  constructor() {
    this.query(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT null)",
    );
  }

  async query(query: string, params?: any) {
    return new Promise((resolve, reject) => {
      this.db.transaction((ctx) => {
        ctx.executeSql(query, params, (_, result) => resolve(result));
      });
    });
  }
}
