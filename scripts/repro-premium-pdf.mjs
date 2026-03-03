import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const currentDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(currentDir, '..');

const fixtureResult = {
  id: 'repro-premium-pdf-session',
  slug: 'temperaments',
  userId: null,
  clientId: 'repro-premium-pdf-client',
  email: null,
  results: [
    { groupId: 'phlegmatic', name: 'Fleumatico', average: 6.2 },
    { groupId: 'melancholic', name: 'Melancolico', average: 5.1 },
    { groupId: 'sanguine', name: 'Sanguineo', average: 4.0 },
    { groupId: 'choleric', name: 'Colerico', average: 3.4 },
  ],
  topSummaries: [],
  meta: {
    title: 'Temperamentos',
    subtitle: 'Repro PDF',
    groupsLabel: 'Bloco',
  },
  timestamp: new Date().toISOString(),
};

async function run() {
  const jiti = createJiti(import.meta.url, {
    interopDefault: true,
    esmResolve: true,
  });

  const { generateTemperamentsPdfBinary } = await jiti.import(
    resolve(projectRoot, 'server/api/report-builders/temperamentsPdfRender.ts'),
  );

  const { fileName, buffer } = await generateTemperamentsPdfBinary(fixtureResult);
  const outputPath = resolve(projectRoot, '.tmp', 'repro.pdf');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, buffer);

  console.log(`Generated ${fileName}`);
  console.log(`Saved PDF to: ${outputPath}`);
  console.log(`Buffer size: ${buffer.length} bytes`);
}

run().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);
  process.exit(1);
});
