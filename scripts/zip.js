const { readdirSync } = require("fs");
const { execSync } = require("child_process");

const jsFiles = readdirSync("./dist").filter((file) => file.endsWith(".js"));

for (const file of jsFiles) {
  execSync(`mv dist/${file} dist/index.js`);
  execSync(`zip -j dist/badges-${file}.zip dist/index.js`);
  execSync(`rm dist/index.js`);
}
