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

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({error });
  }
};
export const OrderController={
    createOrder
}