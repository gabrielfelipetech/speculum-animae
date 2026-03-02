import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const BASE_URL = process.env.CYPRESS_BASE_URL ?? 'http://localhost:5173';
const START_TIMEOUT_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 2000;

function spawnCommand(command, options = {}) {
  return spawn(command, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
    ...options,
  });
}

async function waitForServerToStart(serverProcess) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < START_TIMEOUT_MS) {
    if (serverProcess.exitCode !== null) {
      throw new Error(
        `Dev server exited early with code ${String(serverProcess.exitCode)}.`,
      );
    }

    try {
      const response = await fetch(BASE_URL, { redirect: 'manual' });
      if (response.status >= 200 && response.status < 500) {
        return;
      }
    } catch {
      // keep waiting
    }

    await delay(POLL_INTERVAL_MS);
  }

  throw new Error(`Timed out waiting for ${BASE_URL}.`);
}

function killProcessTree(pid) {
  if (typeof pid !== 'number') return Promise.resolve();

  return new Promise((resolve) => {
    if (process.platform === 'win32') {
      const killer = spawn('taskkill', ['/pid', String(pid), '/T', '/F'], {
        stdio: 'ignore',
      });
      killer.on('close', () => resolve());
      killer.on('error', () => resolve());
      return;
    }

    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      resolve();
      return;
    }

    resolve();
  });
}

async function run() {
  const serverProcess = spawnCommand('npm run dev:e2e', {
    env: {
      ...process.env,
      BILLING_PROVIDER: process.env.BILLING_PROVIDER ?? 'mock',
    },
  });

  let cypressExitCode = 1;

  try {
    await waitForServerToStart(serverProcess);

    const cypressProcess = spawnCommand('npm run cy:run:only');
    cypressExitCode = await new Promise((resolve) => {
      cypressProcess.on('close', (code) => resolve(code ?? 1));
      cypressProcess.on('error', () => resolve(1));
    });
  } finally {
    await killProcessTree(serverProcess.pid);
  }

  process.exit(cypressExitCode);
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
