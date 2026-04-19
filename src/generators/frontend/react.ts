import type { Context } from '../../core/engine/types.js';
import type { Task } from '../../core/engine/types.js';
import type { IngenixPlugin } from '../../core/engine/plugin.js';

function generateReact(ctx: Context): Task[] {
  return [
    {
      type: "copy-template",
      from: "react",
      to: ctx.root
    }
  ];
}

export const reactPlugin: IngenixPlugin = {
  name: "frontend-react",
  apply(ctx) {
    return generateReact(ctx);
  }
};