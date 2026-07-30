const user = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const json = JSON.stringify(user,null, 2);
console.log(json); // {"id":1,"name":"Alice"}
