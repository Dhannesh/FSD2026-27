## symlink

A symlink is a special file in an operating system that acts as a pointer or shortcut to another file or directory.

## File System Watcher

A File System Watcher is a service, library, or API that monitors a specific directory or file on a disk and triggers an event whenever a change occurs (such as creating, modifying, or deleting a file).

File system watchers power tools like live-reloading dev servers (Vite, Nodemon), auto-compilers (TypeScript, Webpack), and file sync tools (Dropbox, Google Drive).

## Copying a File via Streams

Using streams is memory-efficient because the file is processed chunk by chunk in memory rather than loading the entire file into RAM at once.

Method 1: Using pipeline() (Recommended)
The safest and most modern way to connect read and write streams is using pipeline from node:stream/promises. It automatically handles cleanup, backpressure, and errors for both streams.

```
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

async function copyFile(sourcePath, destinationPath) {
  try {
    // 1. Create the read stream
    const readStream = createReadStream(sourcePath, {
      highWaterMark: 64 * 1024, // Read in 64 KB chunks (default)
      encoding: 'utf-8'          // Optional: omit if handling binary files (images, audio)
    });

    // 2. Create the write stream
    const writeStream = createWriteStream(destinationPath);

    // 3. Pipe the read stream directly into the write stream
    await pipeline(readStream, writeStream);

    console.log('File successfully copied!');
  } catch (error) {
    console.error('An error occurred during copying:', error.message);
  }
}

// Usage
copyFile('./large-input.txt', './output-copy.txt');
```

### Important Options & Concepts

| Property /Event | Description                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| highWaterMark   | Specifies buffer size (default is 64 KB for file streams, 16 KB for standard string streams).                                                          |
| encoding        | Set to 'utf-8' (or other text encoding) to receive string chunks; omit it to receive raw Buffer instances (for binary files like images or zip files). |
| Backpressure    | Occurs when reading happens faster than writing. pipeline() handles this automatically by pausing the reader until the writer drains its buffer.       |

## fs.rename, fs.truncate, fs.unlink, fs.link and fs.symlink

Here is a detailed breakdown of these core node:fs/promises file system operations, what each function actually does at the OS level, and practical code examples.

| Method   | Goal               | What It Does Under the Hood                                           |
| -------- | ------------------ | --------------------------------------------------------------------- |
| rename   | Move or rename     | Changes a file’s path or directory entry.                             |
| truncate | Change file size   | Resizes a file (stretching with null bytes or trimming data).         |
| unlink   | Delete a file      | Decrements the file's link count; removes the file when count hits 0. |
| link     | Create a hard link | Creates a second path pointing to the exact same inode/data on disk.  |
| symlink  | Create a soft link | Creates a shortcut file containing the path string to a target.       |
