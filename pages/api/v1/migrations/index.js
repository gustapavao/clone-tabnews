import migrationRunner from 'node-pg-migrate'
import { join } from 'node:path';
import database from "infra/database.js";



export default async function migrations(req, res) {
  const dbClient = await database.getNewClient();

  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: false,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  }

  if (req.method === 'POST') {
    const migratedMigrations = await migrationRunner(defaultMigrationsOptions);
    await dbClient.end();
    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }
    return res.status(200).json(migratedMigrations);
  }

  if (req.method === 'GET') {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: true,
    });
    await dbClient.end();
    return res.status(200).json(pendingMigrations);
  }

  return res.status(405).end()
}
