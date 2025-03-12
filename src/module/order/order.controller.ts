/* eslint-disable @typescript-eslint/no-unused-vars */
import e, { Request, Response } from "express";
import OrderModel from "./order.model";
import config from "../../app/config/config";
import BicycleModel from "./../bycle/bicycle.model";
import { IUser } from "./../user/user.interface";
import User from "../user/user.model";
import sendResponse from "../utils/SendResponse";
import { StatusCodes } from "http-status-codes";
// import { shurjopay } from 'shurjopay';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body; // User ID and product details (bicycleId and quantity)

    // Calculate the total price of the order
    let totalPrice = 0;

    for (const product of products) {
      const bicycle = await BicycleModel.findById(product.bicycleId);
      if (!bicycle) throw new Error("Bicycle not found");
      totalPrice += bicycle.price * product.quantity;
    }

    // Create the order
    const order = new OrderModel({
      userId,
      products,
      totalPrice,
      status: "pending",
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error });
  }
};
//get user
const getOrders = async (req: Request, res: Response) => {
  try {
    const query = req.body; // Get the userId from the request parameters (or query)

    // Find orders for the specific user
    const orders = await OrderModel.find(query);

    res.status(200).json(orders); // Send orders as the response
  } catch (error) {
    res.status(500).json({ error: error }); // Handle server errors
  }
};
//get single order
const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params; // Extract orderId from URL parameters

    // Find the order by its ID
    const order = await OrderModel.findById(orderId);

    res.status(200).json(order); // Send the order as the response
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle server errors
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Extract userId from URL parameters

    // Find orders by userId
    const orders = await OrderModel.find({ userId });

    res.status(200).json(orders); // Send the orders as the response
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle server errors
  }
};
//calculate revine year
const calculateOrder = async (req: Request, res: Response) => {
  try {
    // Total revenue calculation
    const revenueData = await OrderModel.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    // Count unique users
    const uniqueUsers = await OrderModel.distinct("userId");

    // Monthly revenue calculation
    const monthlyRevenue = await OrderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by Year-Month
          totalMonthlyRevenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: -1 } }, // Sort by most recent month
    ]);

    // Yearly revenue calculation
    const yearlyRevenue = await OrderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y", date: "$createdAt" } }, // Group by Year
          totalYearlyRevenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: -1 } }, // Sort by most recent year
    ]);

    res.json({
      totalRevenue: revenueData.length > 0 ? revenueData[0].totalRevenue : 0,
      totalUsers: uniqueUsers.length,
      monthlyRevenue,
      yearlyRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUserId,
  calculateOrder,
};
