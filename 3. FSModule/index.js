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
    existingProduct.qty += product.qty;
  } else {
    cart.push(product);
  }
  await saveCart(cart);
  console.log(`Product ${product.name} added successfully.`);
};

const displayCart = async () => {
  const cart = await getCart();
  if (cart.length == 0) {
    console.log("Cart is empty");
    return;
  }

  console.log("\nShopping Cart");
  console.table(cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  console.log("Total Amount: ₹" + total);
};

const updateQuantity = async (id, qty) => {
  const cart = await getCart();
  const product = cart.find((item) => item.id === id);

  if (!product) {
    console.log("Product not found.");
    return;
  }

  product.qty = qty;

  await saveCart(cart);

  console.log("Quantity updated 😃.");
};

const removeProduct = async (id) => {
  const cart = await getCart();
  const oldlength = cart.length;
  const updatedCart = cart.filter((item) => item.id !== id);
  const newLength = updatedCart.length;
  if (newLength < oldlength) {
    await saveCart(updatedCart);
    console.log(`Product with Id: ${id} removed `);
  } else console.log(`Product not found`);
};

const main = async () => {
  let choice;
  const rl = readline.createInterface({ input: stdin, output: stdout });
  do {
    console.log("1..........Show Cart");
    console.log("2..........Add 🛒 Product");
    console.log("3..........Remove Product");
    console.log("4..........Update Quantity");
    console.log("5..........Checkout");
    choice = (await rl.question("Enter your choice:")).trim();
    switch (Number(choice)) {
      case 1:
        await displayCart();
        break;
      case 2:
        let product = await rl.question(
          "Enter product id,name,price,quantity:",
        );
        const [id, name, price, qty] = product
          .split(",")
          .map((item) => item.trim());
        await addProduct({ id, name, price: Number(price), qty: Number(qty) });
        break;
      case 3:
        const pid = (await rl.question("Enter product id to remove:")).trim();
        await removeProduct(Number(pid));
        break;
      case 4:
        let updateProduct = await rl.question(
          "Enter product id,qty to update:",
        );
        const [uid, uqty] = updateProduct.split(",").map((item) => item.trim());
        await updateQuantity(Number(uid), Number(uqty));
        break;
      case 5:
        console.log("Thank you for order! see you...");
        break;
      default:
        console.log("Invalid choice! try again ⁉️");
    }
  } while (choice != 5);
  rl.close();
};
main();
