import type { Context } from '../../core/engine/types.js';
import type { Task } from '../../core/engine/types.js';
import type { IngenixPlugin } from '../../core/engine/plugin.js';

function generateFastify(ctx: Context): Task[] {
  return [
    {
      type: "copy-template",
      from: "fastify",
      to: ctx.root
    }
  ];
}

export const fastifyPlugin: IngenixPlugin = {
  name: "backend-fastify",
  apply(ctx) {
    return generateFastify(ctx);
  }
};