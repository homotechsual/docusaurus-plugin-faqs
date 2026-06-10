/**
 * Post-install script to create the workspace self-reference symlink.
 *
 * Yarn 4 with node-modules linker does not create a node_modules entry for the
 * root workspace package, but Docusaurus needs to resolve
 * @homotechsual/docusaurus-plugin-faqs from inside the demo workspace via
 * Node.js module resolution. This script creates the necessary symlink/junction.
 */

import { existsSync, mkdirSync, symlinkSync, lstatSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const scopeDir = join(root, 'node_modules', '@homotechsual')
const linkPath = join(scopeDir, 'docusaurus-plugin-faqs')

// If the symlink/junction already exists, nothing to do.
if (existsSync(linkPath)) {
  process.exit(0)
}

// Ensure the @homotechsual scope directory exists.
if (!existsSync(scopeDir)) {
  mkdirSync(scopeDir, { recursive: true })
}

// On Windows, use a junction (no admin rights required); on other platforms
// use a directory symlink.
const symlinkType = process.platform === 'win32' ? 'junction' : 'dir'

try {
  symlinkSync(root, linkPath, symlinkType)
  console.log(
    `[postinstall] Created ${symlinkType}: node_modules/@homotechsual/docusaurus-plugin-faqs -> root`,
  )
} catch (err) {
  // Non-fatal: warn but don't fail the install.
  console.warn(`[postinstall] Could not create workspace symlink: ${err.message}`)
}
