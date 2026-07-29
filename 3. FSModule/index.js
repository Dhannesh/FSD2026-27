import fs from "fs/promises";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const FILE = "cart.json";

const getCart = async () => {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
};

const saveCart = async (cart) => {
  await fs.writeFile(FILE, JSON.stringify(cart, null, 2));
};

const addProduct = async (product) => {
  const cart = await getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  await saveCart(cart);
  console.log("Product added successfully.");
};

const displayCart = async () => {
  const cart = await getCart();

  console.log("\nShopping Cart");
  console.table(cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log("Total Amount: ₹" + total);
};

const updateQuantity = async (id, quantity) => {
  const cart = await getCart();

  const product = cart.find((item) => item.id === id);

  if (!product) {
    console.log("Product not found.");
    return;
  }

  product.quantity = quantity;

  await saveCart(cart);

  console.log("Quantity updated.");
};

const removeProduct = async (id) => {
  const cart = await getCart();

  const updatedCart = cart.filter((item) => item.id !== id);

  await saveCart(updatedCart);

  console.log("Product removed.");
};

const main = async () => {
  let choice;
  const rl = readline.createInterface({ input: stdin, output: stdout });
  do {
    console.log("1..........Show Cart");
    console.log("2..........Add Product");
    console.log("3..........Remove Product");
    console.log("4..........Update Quantity");
    console.log("5..........Checkout");
    choice = await rl.question("Enter your choice:");
  } while (choice !== 5);
  // await addProduct({
  //   id: 101,
  //   name: "Laptop",
  //   price: 65000,
  //   quantity: 1,
  // });

  // await addProduct({
  //   id: 102,
  //   name: "Mouse",
  //   price: 800,
  //   quantity: 2,
  // });

  // await displayCart();

  // await updateQuantity(102, 3);

  // await displayCart();

  // await removeProduct(101);

  // await displayCart();
};
main();
