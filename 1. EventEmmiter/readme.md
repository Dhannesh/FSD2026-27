# EventEmitter in Node.js — Student Notes

## 1. What is EventEmitter?

`EventEmitter` is a built-in Node.js class (from the `node:events` module) that implements the **Observer/Publish-Subscribe pattern**.

- An **emitter** fires (emits) named events.
- One or more **listeners** "subscribe" to those event names and run when the event fires.
- The emitter doesn't know or care who is listening — it just broadcasts.

**Analogy:** A school bell system. The bell rings for "recess" or "assembly" (emits an event). Students who've been told to react to that bell (listeners) respond. The bell doesn't know how many students are listening or who they are.

---

## 2. Why does it matter for backend development?

Node.js is built around **asynchronous, event-driven architecture**. `EventEmitter` is the foundation for a lot of Node's core modules:

| Node Core Feature                     | Built on EventEmitter? |
| ------------------------------------- | ---------------------- |
| `http.Server` (`req`, `res`)          | ✅ Yes                 |
| Streams (`fs.createReadStream`, etc.) | ✅ Yes                 |
| `process` object                      | ✅ Yes                 |
| `child_process`                       | ✅ Yes                 |

Understanding `EventEmitter` = understanding how Node "thinks" under the hood.

---

## 3. Core Methods

| Method                           | Purpose                                                            |
| -------------------------------- | ------------------------------------------------------------------ |
| `.on(eventName, listener)`       | Register a listener — runs every time the event fires              |
| `.emit(eventName, ...args)`      | Fire the event, calling all registered listeners **synchronously** |
| `.once(eventName, listener)`     | Register a listener that runs **only the first time**              |
| `.off(eventName, listener)`      | Remove a specific listener                                         |
| `.removeAllListeners(eventName)` | Remove all listeners for an event                                  |
| `.listenerCount(eventName)`      | Number of listeners currently attached                             |

---

## 4. Basic Example (Modern JS)

```javascript
// eventEmitterDemo.mjs
import { EventEmitter } from "node:events";

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register listeners
myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}! Welcome to the session.`);
});

myEmitter.on("exit", (reason) => {
  console.log(`Session ending. Reason: ${reason}`);
});

// Emit (trigger) events
myEmitter.emit("greet", "Dhanesh");
myEmitter.emit("exit", "Class completed");
```

**Output:**

```
Hello, Dhanesh! Welcome to the session.
Session ending. Reason: Class completed
```

---

## 5. Key Concepts to Remember

### a) Multiple listeners per event

You can attach several listeners to the same event name — they all run, in the order they were registered.

```javascript
myEmitter.on("greet", (name) => console.log(`Hi ${name}`));
myEmitter.on("greet", (name) => console.log(`Logged: ${name} greeted`));
```

### b) `.on()` vs `.once()`

- `.on()` → fires **every time** the event is emitted
- `.once()` → fires **only the first time**, then auto-removes itself

Useful for setup/initialization events that should only run once (e.g., a "ready" event).

### c) Emit is synchronous

`emit()` calls all listeners **immediately and in order**, before the next line of code runs. This is a common misconception — students often assume everything in Node is async by default. It isn't; `EventEmitter` itself is synchronous. Async behavior comes from what you _do_ inside the listener (e.g., calling `setTimeout`, reading a file, etc.)

### d) The special `'error'` event

If you `emit('error', ...)` and **no listener** is registered for `'error'`, Node will **throw an exception and crash the process**. Always attach an `'error'` listener when there's a chance of failure.

```javascript
myEmitter.on("error", (err) => {
  console.error("Something went wrong:", err.message);
});

myEmitter.emit("error", new Error("Something failed"));
```

---

## 6. Passing Data with Events

Any extra arguments passed to `.emit()` are forwarded to the listener function.

```javascript
myEmitter.on("greet", (name, age) => {
  console.log(`${name} is ${age} years old.`);
});

myEmitter.emit("greet", "Dhanesh", 34);
```

---

## 7. Common Real-World Use Cases

- **HTTP servers** — `req.on('data', ...)`, `req.on('end', ...)`
- **File streams** — `stream.on('data', chunk => ...)`
- **Custom app logic** — order placed → emit `'orderPlaced'` → trigger email service, inventory update, logging — all independently, without tightly coupling the code
- **Chat applications** — emit `'message'`, `'userJoined'`, `'userLeft'`

---

## 8. Quick Recap Table

| Concept             | Takeaway                                      |
| ------------------- | --------------------------------------------- |
| Pattern             | Observer / Pub-Sub                            |
| Import              | `import { EventEmitter } from 'node:events'`  |
| Fire event          | `.emit(name, ...args)`                        |
| Listen (repeatable) | `.on(name, fn)`                               |
| Listen (one-time)   | `.once(name, fn)`                             |
| Remove listener     | `.off(name, fn)`                              |
| Execution           | Synchronous, in registration order            |
| Gotcha              | Unhandled `'error'` event crashes the process |

---

## 9. Practice Exercise for Students

> Build a `MyEmitter` class simulating an **online exam system**. It should emit:
>
> - `'examStarted'` (with student name)
> - `'answerSubmitted'` (with question number)
> - `'examSubmitted'` (with final score)
>
> Attach at least two listeners to `'examStarted'` — one to log a welcome message, another to start a timer (just log "Timer started" for now).
