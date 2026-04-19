import type { Context } from '../../core/engine/types.js';
import type { Task } from '../../core/engine/types.js';

export function generate(ctx: Context): Task[] {
  return [
    {
      type: "copy-template",
      from: "react",
      to: ctx.root
    }
  ];
}