const fs = require("fs/promises");
const path = require("path");

const packageJson = require("../package.json");

async function prepack() {
  packageJson.scripts = undefined;
  packageJson.devDependencies = undefined;
  packageJson.prettier = undefined;
  packageJson.packageManager = undefined;

  const dest = path.resolve(__dirname, "../package.json");
  await fs.writeFile(dest, `${JSON.stringify(packageJson, null, 2)}\n`, { encoding: "utf-8" });
}

void prepack();
