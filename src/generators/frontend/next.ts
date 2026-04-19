import type { Context } from '../../core/engine/types.js';
import type { Task } from '../../core/engine/types.js';
import type { IngenixPlugin } from '../../core/engine/plugin.js';

function generateNext(ctx: Context): Task[] {
  return [
    {
      type: "copy-template",
      from: "next",
      to: ctx.root
    }
  ];
}

export const nextPlugin: IngenixPlugin = {
  name: "frontend-next",
  apply(ctx) {
    return generateNext(ctx);
  }
};