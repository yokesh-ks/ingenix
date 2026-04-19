import { cp, mkdir } from 'fs/promises';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function copyTemplate(src: string, dest: string): Promise<void> {
  const srcStat = await stat(src);

  if (srcStat.isDirectory()) {
    // Ensure destination directory exists
    await mkdir(dest, { recursive: true });
    // Copy each entry individually (prevents nesting)
    const entries = await readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);
      await copyTemplate(srcPath, destPath);
    }
  } else {
    // File: copy directly (force overwrite)
    await cp(src, dest, { recursive: true, force: true });
  }
}