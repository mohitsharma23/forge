#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");

program.version("1.0.0").description("Forge - A CLI scaffold tool");

program.option("-db, --database <database>", "Add database");
program.option("-i, --init", "Add recommended packages");

program.parse(process.argv);

const options = program.opts();

if (options.init) {
  // Add package.json required files here
}

if (options.database === "mongo") {
  const folderPath = path.join(process.cwd(), "config");
  const sourcePath = path.join(__dirname, "items/mongo-database.js");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const filePath = `${folderPath}/connect.js`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }

  fs.copyFileSync(sourcePath, filePath);
}
