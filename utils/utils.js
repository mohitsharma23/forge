const fs = require("fs");
const path = require("path");
const { exec, execSync } = require("child_process");

function handleDatabaseConnectionFile(folderPath, filePath, sourcePath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }

  fs.copyFileSync(sourcePath, filePath);
}

function handlePackages(packages) {
  const packageFilePath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packageFilePath)) {
    execSync("npm init -y");
  }

  exec(`npm i ${packages}`);
}

function handleUninstallPackages(packages) {
  exec(`npm uninstall ${packages}`);
}

module.exports = {
  handleDatabaseConnectionFile,
  handlePackages,
  handleUninstallPackages,
};
