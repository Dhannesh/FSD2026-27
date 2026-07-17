const f1 = () => {
  console.log("Hello f1");
};

const f2 = () => {
  console.log("Hello f2");
};

function main() {
  console.log("main");
  setTimeout(f1, 0);
  f2();
}

main();




