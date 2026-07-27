// let promise1 = new Promise((resolve, reject) => {
//   //   resolve("hey, I am done!");
//   reject("hey, I am done with error!");
// });

// let promise2 = new Promise((resolve, reject) => {
//   reject("something is not write!");
// });

// let promise3 = new Promise((resolve, reject) => {
//   resolve("hey, I am done!");
//   reject("something is not write!"); // ignored
//   reject("something is not write!"); //ignored
// });

// ONce the state is changed happen any further call is not executed
// state -
// pending: initially when the executor function starts the execution
// fulfilled: when the promise is resolved
// rejected: when the promise is rejected

// result
// undefined: initially when the state value is pending
// value: when resolve(value) is called
// error: when reject(error) is called

// - Handling promises
// .then() -
//.catch()
//.finally()

// we can use two argument of function in .then
// promise1.then(
//   (result) => {
//     console.log(result);
//   },
//   (error) => {
//     console.log(error);
//   },
// );

/*
promise1
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error))
  .finally(() => (loading = false));
*/

// - Promise Chain
// Rule 1: Every promise gives you a .then() handler method. Every rejected promise provides you a .catch handler.

// Rule 2: You can do mainly three valuable things from the .then() method. You can return another promsie (for async operation). You can return any other value from a synchronous operation. Lastly, you can throw an error.

// Return a promise from the .then() handler

let getUser = new Promise((resolve, reject) => {
  const user = {
    name: "John Doe",
    email: "jdoe@gmail.com",
    password: "jdoe.password",
    permission: ["db", "dev"],
  };
  resolve(user);
});
/*
getUser
  .then((user) => {
    console.log(`Got user ${user.name}`);
    return new Promise((resolve, reject) => {
      // if one promise call returns another promise then we use chaining
      setTimeout(() => {
        resolve("Bangalore");
      }, 2000);
    });
  })
  .then((address) => {
    console.log(`User address is ${address}`);
  });
*/

// Return a simple value from the .then() handler
/*
getUser
  .then((user) => {
    console.log(`Got user ${user.name}`);
    return user.email;
  })
  .then((email) => {
    console.log(`User email is ${email}`);
  });
*/

// Throw an error from the .then() handler
/*
getUser
  .then((user) => {
    if (!user.permission.includes("hr")) {
      throw new Error("You are not allowed to access the HR module");
    }
    return user.email;
  })
  .then((email) => {
    console.log(`User email is ${email}`);
  })
  .catch((error) => {
    console.log(error);
  });
*/
//Rule 3: You can rethrow from the .catch() handler to handle the error later.
// in this case, the control will goto the next closest .catch() handler.
/*
let promise401 = new Promise((resolve, reject) => {
  reject(401);
});

promise401
  .catch((error) => {
    console.log(error);
    if (error === 401) {
      console.log("Rethrowing 401");
      throw error;
    } else {
      // do something
    }
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(`handling ${error} here`);
  });
*/
// Rule 4: unlike .then() and .catch(), the .finally() handler doesn't process the result value or error. It just passes the result as is to the next handler

let promiseFinally = new Promise((resolve, reject) => {
  resolve("Testing Finally.");
});

promiseFinally
  .finally(() => {
    console.log("Running finally");
  })
  .then((result) => {
    console.log(result);
  });
