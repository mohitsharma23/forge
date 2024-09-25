#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { exec, execSync } = require("child_process");

program.version("1.0.0").description("Forge - A CLI scaffold tool");

program.option("-db, --database <database>", "Add database");
program.option("-i, --init", "Add recommended packages");

program.parse(process.argv);

const options = program.opts();

if (options.init) {
  const packageFilePath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packageFilePath)) {
    execSync("npm init -y");
  }

  exec("npm i mongodb mongoose dotenv");
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
