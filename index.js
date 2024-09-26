#! /usr/bin/env node

const path = require("path");
const { program } = require("commander");
const {
  handlePackages,
  handleUninstallPackages,
  handleDatabaseConnectionFile,
} = require("./utils/utils");
const { DATABASE } = require("./constants/constants");

program.version("1.0.0").description("Forge - A CLI scaffold tool");

program.option("-db, --database <database>", "Add database");
program.option("-i, --init", "Add recommended packages");

program.parse(process.argv);

const options = program.opts();

if (options.init) {
  handlePackages("dotenv");
}

if (options.database) {
  const folderPath = path.join(process.cwd(), "config");
  const filePath = `${folderPath}/connect.js`;

  switch (options.database) {
    case DATABASE.MONGO:
      handleUninstallPackages("pg");
      handlePackages("mongodb mongoose");
      const mongoSourcePath = path.join(__dirname, "items/mongo-database.js");
      handleDatabaseConnectionFile(folderPath, filePath, mongoSourcePath);
      break;

    case DATABASE.POSTGRES:
      handleUninstallPackages("mongodb mongoose");
      handlePackages("pg");
      const postgresSourcePath = path.join(
        __dirname,
        "items/postgres-database.js"
      );
      handleDatabaseConnectionFile(folderPath, filePath, postgresSourcePath);
      break;

    default:
      console.log("Please enter valid database name");
      break;
  }
}
