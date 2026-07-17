import { EventEmitter } from "node:events";

class VirtualElement extends EventEmitter {
  constructor(tagName, id) {
    super();
    this.tagName = tagName;
    this.id = id;
  }

  addEventListener(type, handler) {
    this.on(type, handler);
  }

  removeEventListener(type, handler) {
    this.off(type, handler);
  }

  dispatchEvent(type, detail = {}) {
    this.emit(type, { type, target: this, detail, timestamp: new Date() });
  }
}

const cart = {
  items: [],
  total: 0,
};

const addToCartBtn = new VirtualElement("button", "addToCartBtn");
const quantityInput = new VirtualElement("input", "quantityInput");
const checkoutBtn = new VirtualElement("button", "checkoutBtn");

let currentQty = 1;

// Event listeners — this is the "frontend logic" being tested

quantityInput.addEventListener("input", (e) => {
  currentQty = Number(e.detail.value);
  console.log(`Quantity updated to: ${currentQty}`);
});

addToCartBtn.addEventListener("click", (e) => {
  const product = { name: "Wireless Mouse", price: 799, qty: currentQty };
  cart.items.push(product);
  cart.total += product.price * product.qty;

  console.log(`🛒 Added ${product.qty} x "${product.name}" to cart`);
  console.log(`   Cart total: ₹${cart.total}`);
});

checkoutBtn.addEventListener("click", () => {
  if (cart.items.length === 0) {
    checkoutBtn.dispatchEvent("error", { message: "Cart is empty" });
    return;
  }
  console.log(
    `✅ Proceeding to checkout — ${cart.items.length} item(s), total ₹${cart.total}`,
  );
});

checkoutBtn.addEventListener("error", (e) => {
  console.error(`❌ Checkout blocked: ${e.detail.message}`);
});

// Simulate a user session (no browser needed!)

console.log("--- Simulating user interaction ---\n");

quantityInput.dispatchEvent("input", { value: "2" });
addToCartBtn.dispatchEvent("click");

quantityInput.dispatchEvent("input", { value: "1" });
addToCartBtn.dispatchEvent("click");

checkoutBtn.dispatchEvent("click");
