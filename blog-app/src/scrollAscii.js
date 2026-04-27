/** Large-resolution ASCII art (fixed-width), sourced from scrollAscii.txt. */
import raw from './scrollAscii.txt?raw';

const LINES = raw.replace(/\r\n/g, '\n').split('\n');
while (LINES.length > 0 && LINES[LINES.length - 1] === '') LINES.pop();

const WIDTH = Math.max(...LINES.map((l) => l.length));
export const SCROLL_ASCII = LINES.map((l) => l.padEnd(WIDTH)).join('\n');
