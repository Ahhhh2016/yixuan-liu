/** Gramophone / 留声机 ASCII art — raw lines in phonographAscii.txt, fixed width for <pre>. */
import raw from './phonographAscii.txt?raw';

const LINES = raw.replace(/\r\n/g, '\n').split('\n');
while (LINES.length > 0 && LINES[LINES.length - 1] === '') LINES.pop();

const WIDTH = Math.max(...LINES.map((l) => l.length));
export const PHONOGRAPH_ASCII = LINES.map((l) => l.padEnd(WIDTH)).join('\n');
