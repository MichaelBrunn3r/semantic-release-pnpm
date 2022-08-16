import fs from 'fs';
import path from 'path';

const exportPackageJsonFields = new Set([
  'name',
  'version',
  'description',
  'author',
  'license',
  'keywords',
  'repository',
  'homepage',
  'bugs',
  'main',
  'module',
  'types',
  'scripts',
  'files',
  'devDependencies',
]);
const exportScripts = new Set(['prepack']);
const exportFiles = ['README.md', 'LICENSE'];

console.log('Prepack');

let packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'));

const OUT_DIR = path.resolve(packageJson.publishConfig?.directory ?? 'dist');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR);
}

// Copy package.json to output directory
packageJson = Object.fromEntries(
  Object.entries(packageJson).filter(([key]) => exportPackageJsonFields.has(key))
);
packageJson.scripts = Object.fromEntries(
  Object.entries(packageJson.scripts).filter(([key]) => exportScripts.has(key))
);
console.log('Copied package.json to', path.resolve(OUT_DIR, 'package.json'));
fs.writeFileSync(path.resolve(OUT_DIR, 'package.json'), JSON.stringify(packageJson, null, 2));

// Copy files
exportFiles.concat(packageJson.files ?? []).forEach((file: string) => {
  const src = path.resolve(file);
  const dest = path.resolve(OUT_DIR, file);

  if (!fs.existsSync(src) || fs.existsSync(dest)) return;

  console.log('Copying', src, 'to', dest);
  fs.copyFileSync(src, dest);
});
