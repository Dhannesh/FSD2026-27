import EventEmitter from "events";

const loginForm = new EventEmitter();

loginForm.on("submit", (username, password) => {
  console.log("Form Submitted");
  console.log("Username:", username);
  console.log("Password:", password);
});

loginForm.emit("submit", "admin", "1234");
