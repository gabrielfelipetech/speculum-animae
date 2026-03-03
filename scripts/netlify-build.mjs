import { spawnSync } from 'node:child_process'

const isWindows = process.platform === 'win32'
const isLinux = process.platform === 'linux'
const npmCommand = isWindows ? 'npm.cmd' : 'npm'

function runStep(args, label) {
  console.log(`[netlify-build] ${label}`)
  const result = spawnSync(npmCommand, args, {
    stdio: 'inherit',
    env: process.env,
  })

  return result.status === 0
}

if (!runStep(['ci', '--include=dev', '--force'], 'Installing dependencies')) {
  process.exit(1)
}

if (isLinux) {
  const rebuilt = runStep(
    ['rebuild', 'better-sqlite3', '--build-from-source'],
    'Rebuilding better-sqlite3 from source',
  )

  if (!rebuilt) {
    const installed = runStep(
      ['i', 'better-sqlite3', '--build-from-source'],
      'Fallback install of better-sqlite3 from source',
    )

    if (!installed) {
      process.exit(1)
    }
  }
} else {
  console.log(
    `[netlify-build] Non-Linux platform detected (${process.platform}); using regular better-sqlite3 rebuild for local parity.`,
  )

  if (!runStep(['rebuild', 'better-sqlite3'], 'Rebuilding better-sqlite3')) {
    process.exit(1)
  }
}

if (!runStep(['run', 'build'], 'Running app build')) {
  process.exit(1)
}
