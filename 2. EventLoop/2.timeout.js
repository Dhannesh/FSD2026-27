import fs from "fs/promises";
const f1 = () => {
  console.log("Hello f1", new Date().toLocaleTimeString());
};

const f2 = () => {
  console.log("Hello f2", new Date().toLocaleTimeString());
};

const writeData = async () => {
  try {
    await fs.writeFile("student.txt", "Name: Rahul\nCourse:B.Tech");
    console.log("File Created successfully");
  } catch (error) {
    console.log(error);
  }
};
const readData = async () => {
  try {
    const data = await fs.readFile("student.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

function main() {
  console.log("main");
  // setTimeout(f1, 5000);
  // setTimeout(f1, 0);
  // setInterval(f1, 1000);
  // setImmediate(f1);
  // process.nextTick(f1);
  writeData();
  f2();
  readData();
  console.log("Main terminated");
}

main();
