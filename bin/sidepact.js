#!/usr/bin/env node
import { main } from '../dist/cli.js';
try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(`sidepact: ${error.message}`);
  process.exitCode = 1;
}
