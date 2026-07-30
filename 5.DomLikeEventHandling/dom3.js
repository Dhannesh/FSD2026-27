import EventEmitter from "events";

const button = new EventEmitter();

button.on("click", (user) => {
  console.log(`${user} clicked the button.`);
});

button.emit("click", "Sohan");
button.emit("click", "Mohan");
