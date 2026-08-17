import { access, rename, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const apiDirectory = resolve("src/app/api");
const backupDirectory = resolve(".github-pages-api-backup");

try {
  await access(backupDirectory);
  throw new Error(
    "A pasta .github-pages-api-backup já existe. Restaure src/app/api antes de continuar.",
  );
} catch (error) {
  if (error instanceof Error && error.message.includes("já existe"))
    throw error;
}

await rename(apiDirectory, backupDirectory);

try {
  await rm(resolve(".next"), { recursive: true, force: true });
  await rm(resolve("out"), { recursive: true, force: true });
  const result = spawnSync(
    process.execPath,
    [resolve("node_modules/next/dist/bin/next"), "build"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        GITHUB_PAGES: "true",
        NEXT_PUBLIC_STATIC_DEMO: "true",
        NEXT_PUBLIC_BASE_PATH: "/sol-e-petalas",
        NEXT_PUBLIC_SITE_URL: "https://1victorx.github.io/sol-e-petalas",
      },
    },
  );

  if (result.status !== 0) {
    throw new Error(
      `O build estático falhou com código ${result.status ?? "desconhecido"}: ${result.error?.message ?? "sem detalhe adicional"}.`,
    );
  }
} finally {
  await rename(backupDirectory, apiDirectory);
}
