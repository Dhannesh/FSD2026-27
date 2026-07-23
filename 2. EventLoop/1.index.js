// JS is synchronous and single threaded

function f1() {
  console.log("started f1");
  f2();
  console.log("ending f1");
}

function f2() {
  console.log("started f2");
  f3();
  console.log("ending f2");
}

function f3() {
  console.log("started f3");
  console.log("ending f3");
}

f1();
// JS synchronous and single threaded
// There can be async behaviouss
//- with broswer API/Web APIs - setTimeout, setInterval
// - with Promises
// - with Event Handlers

//Event Loop -kitchen assistant
// - call stack
// - Web APIs
// - Callback queue:
// - MicroTask Queue/Job Queue
// - Event Loop
