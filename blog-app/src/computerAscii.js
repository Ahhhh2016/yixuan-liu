/** Computer / CRT-style ASCII art — read from computerAscii.txt, fixed width for <pre>. */
import raw from './computerAscii.txt?raw';

const LINES = raw.replace(/\r\n/g, '\n').split('\n');
while (LINES.length > 0 && LINES[LINES.length - 1] === '') LINES.pop();

const WIDTH = Math.max(...LINES.map((l) => l.length));
export const COMPUTER_ASCII = LINES.map((l) => l.padEnd(WIDTH)).join('\n');
