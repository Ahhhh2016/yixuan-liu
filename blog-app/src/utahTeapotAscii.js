/** Utah Teapot ASCII art — read from utahTeapotAscii.txt, fixed width for <pre>. */
import raw from './utahTeapotAscii.txt?raw';

const LINES = raw.replace(/\r\n/g, '\n').split('\n');
while (LINES.length > 0 && LINES[LINES.length - 1] === '') LINES.pop();

const WIDTH = Math.max(...LINES.map((l) => l.length));
export const UTAH_TEAPOT_ASCII = LINES.map((l) => l.padEnd(WIDTH)).join('\n');
