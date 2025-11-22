import { json } from "express";
import Test from "../models/test.model.js";

export const aggregationPipelineTest = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      items,
      orderDate,
      status,
      paymentMethod,
      location,
    } = req.body;

    if (
      !customerId &&
      !customerName &&
      !items &&
      !orderDate &&
      !status &&
      !paymentMethod &&
      !location
    ) {
      return res.status(400).json({ message: "all Fields are required" });
    }
    const newOrder = new Test({
      customerId,
      customerName,
      items,
      orderDate,
      status,
      paymentMethod,
      location,
    });

    await newOrder.save();
    res.json({ message: "order successfully placed", order: newOrder });
  } catch (error) {
    console.log(error);
    // res.json(error)
  }
};

export const getOrdersMatch = async (req, res) => {
  try {
    const orders = await Test.aggregate([
      {
        $match: {
          $and: [
            { status: { $eq: "Delivered" } },
            { paymentMethod: { $eq: "UPI" } },
          ],
        },
      },
    ]);
    res.json(orders);
  } catch (error) {}
};

export const getOrderUnwind = async (req, res) => {
  try {
    const orders = await Test.aggregate([{ $unwind: "$items" }]);
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderGroup = async (req, res) => {
  try {
    const orders = await Test.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$customerId",
          totalOrders: { $sum: 1 },
          totalAmount: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] },
          },
        },
      },
    ]);
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderProject=async(req,res)=>{
    try {
         const orders = await Test.aggregate([
             { $unwind: "$items" },
            {$project:{
                customerName:"$customerName",
                totalItems:{$sum:"$items.quantity"},
                orderDate:"$orderDate",
                location:"$location.city",
                _id:0
            }},
            
         ])
         res.json(orders)
    } catch (error) {
        console.log(error)
    }
}

export const getgroupNdSort=async(req,res)=>{
    
  try {
    const result = await Test.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$customerId",
          totalAmount: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] }
          }
        }
      },
      { $sort: { totalAmount: -1 } }, 
      { $limit: 3 } 
    ]);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};



export const getMostSoldProduct = async (req, res) => {
  try {
    const result = await Test.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 0,
          product: "$_id",
          totalSold: 1
        }
      }
    ]);

    res.json(result[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getMumbaiRevenue = async (req, res) => {
  try {
    const result = await Test.aggregate([
      { $match: { "location.city": "Mumbai" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$location.city",
          totalRevenue: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] }
          }
        }
      },
      { $project: { _id: 0, totalRevenue: 1 } }
    ]);

    res.json(result[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerSummary = async (req, res) => {
  try {
    const result = await Test.aggregate([
      { $unwind: "$items" },

      {
        $group: {
          _id: "$customerId",
          customerName: { $first: "$customerName" },
          city: { $first: "$location.city" },
          lastOrderDate: { $max: "$orderDate" },

          totalAmount: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] }
          },

          totalItems: { $sum: "$items.quantity" },

          mostExpensivePrice: { $max: "$items.price" },
          products: { $push: "$items" } 
        }
      },

      {
        $addFields: {
          mostExpensiveItem: {
            $filter: {
              input: "$products",
              as: "p",
              cond: { $eq: ["$$p.price", "$mostExpensivePrice"] }
            }
          }
        }
      },

      { $unwind: "$mostExpensiveItem" },

      {
        $project: {
          _id: 0,
          customerId: "$_id",
          customerName: 1,
          city: 1,
          lastOrderDate: 1,
          totalAmount: 1,
          totalItems: 1,
          mostExpensiveItem: "$mostExpensiveItem.product"
        }
      },

      { $sort: { totalAmount: -1 } },
      { $limit: 3 }
    ]);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

