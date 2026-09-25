import { defineConfig, loadEnv, type PluginOption } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { devtools } from "@tanstack/devtools-vite";

// Self-hosted Vite config for a TanStack Start app (React + SSR + server
// functions). Targets a standard Node server on build — change the nitro
// `preset` below if you deploy to a different runtime (e.g. "cloudflare-module"
// for Cloudflare Workers, "vercel" for Vercel).
export default defineConfig(({ command, mode }) => {
  const isDev = mode === "development";

  // Expose VITE_-prefixed env vars as import.meta.env.KEY, same as Vite's
  // own default behaviour.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  );

  const plugins: PluginOption[] = [];

  if (isDev) {
    plugins.push(
      devtools({
        logging: false,
        eventBusConfig: { enabled: false },
        enhancedLogs: { enabled: false },
        consolePiping: { enabled: false },
        removeDevtoolsOnBuild: false,
        injectSource: { enabled: true },
      }),
    );
  }

  plugins.push(tailwindcss());
  plugins.push(tsConfigPaths({ projects: ["./tsconfig.json"] }));

  plugins.push(
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Matches src/server.ts, our SSR error-wrapper entry point.
      server: { entry: "server" },
    }),
  );

  if (command === "build") {
    plugins.push(
      nitro({
        preset: "node-server",
        output: {
          dir: "dist",
          serverDir: "dist/server",
          publicDir: "dist/client",
        },
      }),
    );
  }

  plugins.push(viteReact());

  return {
    define: envDefine,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
      ignoreOutdatedRequests: true,
    },
    server: { host: "::", port: 8080 },
    plugins,
  };
});
