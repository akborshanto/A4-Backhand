import { Router } from "express";
import { OrderController } from "./order.controller";

const orderRouter = Router();

// Create Order
orderRouter.post("/create-order", OrderController.createOrder);

// Get All Orders
orderRouter.get("/", OrderController.getOrders);

// Get a Single Order by ID
orderRouter.get("/:orderId", OrderController.getOrderById); // নতুন method ব্যবহার করা হয়েছে

// Uncomment if needed
// orderRouter.get("/revenue", OrderController.getTotalRevenue);

export default orderRouter;
