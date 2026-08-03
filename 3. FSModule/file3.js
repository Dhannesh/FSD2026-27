import { watch } from "fs/promises";

try {
  const watcher = watch("./cart.json", { recursive: true });

  for await (const event of watcher) {
    console.log(`Event type: ${event.eventType}`); // 'change' or 'rename'
    console.log(`File affected: ${event.filename}`);
  }
} catch (err) {
  console.error("Watcher error:", err);
}
