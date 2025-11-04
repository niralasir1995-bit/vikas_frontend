// fix-api-issues.js
import fs from "fs";
import path from "path";

const exts = [".js", ".jsx"];
const root = "./src";

function walk(dir) {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) results = results.concat(walk(filePath));
    else if (exts.includes(path.extname(filePath))) results.push(filePath);
  }
  return results;
}

const files = walk(root);
let totalChanges = 0;

for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  let orig = text;

  // 1. fix lowercase api.
  text = text.replace(/\bapi\./g, "API.");

  // 2. fix import.meta.env used as string
  text = text.replace(/("|')import\.meta\.env[^"']*("|')/g, "import.meta.env.VITE_API_BASE");

  // 3. remove bad const API = "import.meta..."
  text = text.replace(/const\s+API\s*=\s*("|')import\.meta\.env[^;]*;/g, "");

  // 4. fix unquoted API paths
  text = text.replace(/API\.(get|post|put|delete|patch)\s*\(\s*\/api/g, 'API.$1("/api');

  // 5. fix single-quoted template literals
  text = text.replace(/'(\$\{[^}]+\})'/g, "`$1`");

  // 6. ensure import API from "../api"
  if (text.includes("API.") && !text.match(/import\s+API\s+from\s+["']\.\.\/api["']/)) {
    text = `import API from "../api";\n${text}`;
  }

  if (text !== orig) {
    fs.writeFileSync(file, text, "utf8");
    totalChanges++;
  }
}

console.log(`✅ Fixed ${totalChanges} files successfully!`);
