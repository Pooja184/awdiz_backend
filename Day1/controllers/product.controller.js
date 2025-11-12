import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { title, category, brand, imgUrl, description, price } = req.body;

    if (!title || !category || !price) {
      return res
        .status(400)
        .json({ message: "Title, category, and price are required" });
    }

    // req.userId is set in tokenDecoder middleware
    const newProduct = new Product({
      title,
      category,
      brand,
      imgUrl,
      description,
      price,
      userId: req.userId, // ✅ store the logged-in user's ID
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "✅ Product added successfully", product: newProduct });
  } catch (error) {
    console.log("Error adding product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ fetch all products of the logged-in user
export const getMyProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const myProducts = await Product.find({ userId });
    res.status(200).json(myProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // ✅ only products, no join
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// ✅ Delete
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

