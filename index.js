#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");

program.version("1.0.0").description("Forge - A CLI scaffold tool");

program.option("-db, --database <database>", "Add database");

program.parse(process.argv);

const options = program.opts();

if (options.database === "mongo") {
  const folderPath = path.join(process.cwd(), "config");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log("Folder created success");
  }
}

program.parse(process.argv);
