/**
 * Post-build script to patch the Vercel serverless function runtime.
 * 
 * @astrojs/vercel 7.x hardcodes "nodejs18.x" in .vc-config.json,
 * but Vercel has deprecated that runtime. This script patches it
 * to "nodejs20.x" after the Astro build completes.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const configPath = join(
  process.cwd(),
  '.vercel', 'output', 'functions', '_render.func', '.vc-config.json'
);

if (existsSync(configPath)) {
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  
  if (config.runtime === 'nodejs18.x') {
    config.runtime = 'nodejs20.x';
    writeFileSync(configPath, JSON.stringify(config, null, '\t'));
    console.log('✅ Patched .vc-config.json runtime: nodejs18.x → nodejs20.x');
  } else {
    console.log(`ℹ️  Runtime already set to: ${config.runtime}`);
  }
} else {
  console.warn('⚠️  .vc-config.json not found — skipping patch.');
}
