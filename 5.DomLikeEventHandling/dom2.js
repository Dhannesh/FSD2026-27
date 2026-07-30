import EventEmitter from "events";

const button = new EventEmitter();

button.on("click", () => {
  console.log("Listener 1");
});

button.on("click", () => {
  console.log("Listener 2");
});

button.emit("click");
