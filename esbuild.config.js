const esbuild = require("esbuild");

const commonOptions = {
  bundle: true,
  minify: true,
  sourcemap: true
};

// Electron (메인 프로세스) 빌드
esbuild.build({
  ...commonOptions,
  entryPoints: ["src/main/main.ts"],
  platform: "node",
  outfile: "build/main.js"
}).catch(() => process.exit(1));

// React (렌더러 프로세스) 빌드
esbuild.build({
  ...commonOptions,
  entryPoints: ["src/renderer/index.tsx"],
  platform: "browser",
  outfile: "build/renderer.js"
}).catch(() => process.exit(1));
