import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

async function copyFile(sourcePath, destinationPath) {
  try {
    // 1. Create the read stream
    const readStream = createReadStream(sourcePath, {
      highWaterMark: 64 * 1024, // Read in 64 KB chunks (default)
      encoding: "utf-8", // Optional: omit if handling binary files (images, audio)
    });

    // 2. Create the write stream
    const writeStream = createWriteStream(destinationPath);

    // 3. Pipe the read stream directly into the write stream
    await pipeline(readStream, writeStream);

    console.log("File successfully copied!");
  } catch (error) {
    console.error("An error occurred during copying:", error.message);
  }
}

// Usage
copyFile("./large-input.txt", "./output-copy.txt");
