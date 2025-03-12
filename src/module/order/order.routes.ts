import { Router } from "express";
import { OrderController } from "./order.controller";

const orderRouter = Router();

// Create Order
orderRouter.post("/create-order", OrderController.createOrder);

// Get All Orders
orderRouter.get("/", OrderController.getOrders);

// Get a Single Order by ID
orderRouter.get("/:orderId", OrderController.getOrderById);
orderRouter.get("/user/:userId", OrderController.getOrdersByUserId);
//calculate totalRevenue
orderRouter.get("/stats/revenue", OrderController.calculateOrder);

export default orderRouter;
