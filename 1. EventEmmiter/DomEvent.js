// domLikeEmitter.mjs
import { EventEmitter } from "node:events";

class DOMLikeEmitter extends EventEmitter {
  // Mimic browser's addEventListener
  addEventListener(eventName, callback) {
    this.on(eventName, callback);
  }

  // Mimic browser's removeEventListener
  removeEventListener(eventName, callback) {
    this.off(eventName, callback);
  }

  // Mimic browser's dispatchEvent
  dispatchEvent(eventName, eventData = {}) {
    // Wrap data in an "event object", like the browser does
    const event = {
      type: eventName,
      timestamp: new Date(),
      ...eventData,
    };
    this.emit(eventName, event);
  }
}

// --- Usage ---
const button = new DOMLikeEmitter();

function handleClick(event) {
  console.log(`Button clicked! Type: ${event.type}, at ${event.timestamp}`);
}

button.addEventListener("click", handleClick);

button.dispatchEvent("click", { targetId: "submitBtn" });
// // Button clicked! Type: click, at <timestamp>

// button.removeEventListener("click", handleClick);

// button.dispatchEvent("click", { targetId: "submitBtn" });
// // (nothing happens — listener was removed)
