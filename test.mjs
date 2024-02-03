import fs from 'fs/promises';
import Eleventy from '@11ty/eleventy';

// Sample content
const content = `
---
title: This is a test
---

# {{ title }}

test
`.trim();

// Write the file
fs.writeFile('index.md', content, 'utf-8');

// Create an 11ty instance
const eleventy = new Eleventy('.', './_site');
await eleventy.write();

//
// At this point, everything looks good in index.html!
//

// Let's append some text to the markdown file. It doesn't seem to matter if we do 
// it programmatically or if we do it in a text editor. The result is the same.
await fs.writeFile('index.md', content + `\n\nnew content`, 'utf-8');

// Call .write() again. 11ty says it writes the files, but the new content isn't
// in index.html
await eleventy.write();

// The console should have "<p>new content</p>", but it ends in "<p>test</p>"
console.log(await fs.readFile('./_site/index.html', 'utf-8'));
