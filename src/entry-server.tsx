import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

// Render the same component tree for every visitor. Wait for lazy sections
// before piping so the saved HTML contains content, not loading placeholders.
export function render() {
  return new Promise<string>((resolve, reject) => {
    let html = '';
    const destination = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    destination.on('finish', () => resolve(html));
    destination.on('error', reject);
    const stream = renderToPipeableStream(<App />, {
      onAllReady() { stream.pipe(destination); },
      onError(error) { reject(error); },
    });
  });
}

import { Writable } from 'node:stream';
