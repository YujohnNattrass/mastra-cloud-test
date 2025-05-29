
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { LangfuseExporter } from "langfuse-vercel";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  // server: {
  //   middleware: [
  //     {
  //       handler: async (c, next) => {
  //       const isFromMastraCloud = c.req.header('x-mastra-cloud') === 'true';
  //       const isDevPlayground = c.req.header('x-mastra-dev-playground') === 'true'
  //       console.log('isFromMastraCloud', isFromMastraCloud);
  //       console.log('isDevPlayground', isDevPlayground);
  //       if(isFromMastraCloud || isDevPlayground) {
  //         await next();
  //         return;
  //       }

  //       const authHeader = c.req.header("Authorization");
  //       if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //         return new Response('Unauthorized', { status: 401 });
  //       }
  //       const token = authHeader.substring(7);
  //       const validApiKey = process.env.BEARER_KEY || 'your-secret-api-key';
  //       if (token !== validApiKey) {
  //       return new Response('Invalid token', { status: 401 });
  //       }
  //       await next();
  //       },
  //       path: "/api/*",
  //     },
  //   ]
  // }
});
