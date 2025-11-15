import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    // If no cart → create one
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: quantity || 1 }],
      });
    } else {
      const item = cart.products.find(
        (p) => p.productId.toString() === productId
      );

      if (item) {
        item.quantity += quantity || 1;
      } else {
        cart.products.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.status(200).json({ products: [] });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error getting cart", error });
  }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing", error });
  }
};

// CLEAR CART (after checkout)
export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Checkout successful, cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
