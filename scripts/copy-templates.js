const { cp } = require('node:fs/promises');
const { join } = require('node:path');

const projectRoot = join(__dirname, '..');
const srcTemplates = join(projectRoot, 'src', 'templates');
const distTemplates = join(projectRoot, 'dist', 'templates');

(async () => {
  await cp(srcTemplates, distTemplates, { recursive: true });
  console.log('✓ Templates copied to dist/templates');
})();
