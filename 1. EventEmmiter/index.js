import { EventEmitter } from "node:events";

// class MyEmitter extends EventEmitter {
//   createdAt = new Date();
// }

const myEmitter = new EventEmitter();

const logListener = (name) => {
  console.log(`(Log) greet event fired for: ${name}`);
};

myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}! Welcome to the session`);
});

myEmitter.on("greet", (name) => {
  console.log(`(Logging) Greet event triggered for: ${name}`);
});
myEmitter.on("greet", logListener);
myEmitter.on("exit", (reason) => {
  console.log(`Session ending. Reason: ${reason}`);
});

myEmitter.once("exit", () => {
  console.log("(This cleanup listener runs only once)");
});

console.log("Listener count for greet:", myEmitter.listenerCount("greet"));

myEmitter.emit("greet", "Dhanesh");
myEmitter.emit("hello", "kuchv");
myEmitter.off("greet", logListener);
console.log("\n\n");

myEmitter.emit("greet", "Dhanesh");

myEmitter.removeAllListeners("greet");
myEmitter.emit("greet", "Dhanesh");
// myEmitter.emit("exit", "Class completed");

// myEmitter.emit("exit", "Second call - Testing once()");
