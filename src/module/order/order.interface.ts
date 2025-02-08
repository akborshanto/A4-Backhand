
export interface IOrder extends Document {
    userId: string; // Linked to user
    products: Array<{ bicycleId: string; quantity: number }>; // Products ordered (linked to bicycle)
    totalPrice: number; // Total price for the order
    status: string; // Order status (e.g., 'pending', 'completed', 'shipped')
    createdAt: Date; // Date when order was created
  }
  