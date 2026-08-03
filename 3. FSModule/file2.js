import { stat } from "fs/promises";

let stats = await stat("index.js");
console.log("Stat Info");
console.log(`Size: ${stats.size} bytes`);
console.log(`Is file? ${stats.isFile()}`);
console.log(`Is directory? ${stats.isDirectory()}`);
console.log(`Is symlink? ${stats.isSymbolicLink()}`);


// info = await lstat("index.js");
// console.log("Lstat Info");
// console.log(info);

// info = await fstat("index.js");
// console.log("Fstat Info");
// console.log(info);
