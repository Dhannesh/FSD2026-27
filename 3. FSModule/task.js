import fs from "fs/promises";

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

const updateData = async () => {
  try {
    await fs.writeFile("student.txt", "Name: Aman\nBranch:AIML");
    console.log("File updated");
  } catch (error) {
    console.log(error);
  }
};

const appendData = async () => {
  try {
    await fs.appendFile("student.txt", "\nSemester: 5");
    console.log("data appended");
  } catch (error) {
    console.log(error);
  }
};
const removeFile = async () => {
  try {
    await fs.unlink("student.txt");
    console.log("File deleted.");
  } catch (err) {
    console.log(err);
  }
};
//await writeData();
// await readData();
// await updateData();
//  await appendData();
await removeFile();
