import type { Context } from '../../core/engine/types.js';
import type { Task } from '../../core/engine/types.js';
import type { IngenixPlugin } from '../../core/engine/plugin.js';

function generateExpress(ctx: Context): Task[] {
  return [
    {
      type: "copy-template",
      from: "express",
      to: ctx.root
    }
  ];
}

export const expressPlugin: IngenixPlugin = {
  name: "backend-express",
  apply(ctx) {
    return generateExpress(ctx);
  }
};