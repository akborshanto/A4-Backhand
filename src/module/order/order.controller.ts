import { Request, Response } from 'express';
import OrderModel from './order.model';

import BicycleModel from './../bycle/bicycle.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body; // User ID and product details (bicycleId and quantity)

    // Calculate the total price of the order
    let totalPrice = 0;
    
    for (const product of products) {
      const bicycle = await BicycleModel.findById(product.bicycleId);
      if (!bicycle) throw new Error('Bicycle not found');
      totalPrice += bicycle.price * product.quantity;
    }

    // Create the order
    const order = new OrderModel({
      userId,
      products,
      totalPrice,
      status: 'pending',
    });
console.log(order)
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({error });
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
export const OrderController={
    createOrder,
    getOrders
}