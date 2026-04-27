/** Notebook ASCII art — raw lines in notebookAscii.txt, fixed width for <pre>. */
import raw from './notebookAscii.txt?raw';

const LINES = raw.replace(/\r\n/g, '\n').split('\n');
while (LINES.length > 0 && LINES[LINES.length - 1] === '') LINES.pop();

const WIDTH = Math.max(...LINES.map((l) => l.length));
export const NOTEBOOK_ASCII = LINES.map((l) => l.padEnd(WIDTH)).join('\n');
