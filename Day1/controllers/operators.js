import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const operatorsAssignment = async (req, res) => {
  try {
    // const myProducts = await Product.find({ price:{$gt:2000} });
    // const myProducts = await Product.find({ title:{$eq:"tshirt"} });
    // const myProducts = await Product.find({ price:{$gte:2000} });
    // const myProducts = await Product.find({ price:{$lt:2000} });
    // const myProducts = await Product.find({ price:{$lte:3000} });

    // const myProducts = await Product.find({
    //      $and:[
    //         {price:{$gt:2000}},
    //         {title:"tshirt"}
    //      ]
    //      });

    // const myProducts = await Product.find({
    //  $or:[
    //     {price:{$lt:2000}},
    //     {title:"tshirt"}
    //  ]
    //  });

    // const myProducts = await Product.find({
    //  $nor:[
    //     {price:{$gt:2000}},
    //     {title:"tshirt"}
    //  ]
    //  });

    //     const myProducts = await Product.find({
    //  brand:{$nin:["adidas","one8"]}
    //  });

    const myProducts = await Product.find({
      brand: { $in: ["puma", "nike"] },
    });

    res.status(200).json(myProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const aggregationPipeline = async (req, res) => {
  const products = await Product.aggregate([
    { $match: { brand: { $eq: "puma" } } },
    {
      $group: {
        _id: "$category",
        totalPrice: { $sum: "$price" },
        avgPrice: { $avg: "$price" },
        products: { $push: "$title" },
      },
    },
  ]);
  res.json(products);
};

export const aggregationPipeline1 = async (req, res) => {
  const products = await Cart.aggregate([
    { $unwind: "$products" },
    {
      $project: {
        userId: 1,
        productId: "$products.productId",
      },
    },
  ]);
  res.json(products);
};
