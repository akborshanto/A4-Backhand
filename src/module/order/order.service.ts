
// import OrderModel from './order.model';
// import BicycleModel from './../bycle/bicycle.model';

// export const createOrder = async (userId: string, products: any[]) => {
//   let totalPrice = 0;

//   // Stock validation and total price calculation
//   for (const product of products) {
//     const bicycle = await BicycleModel.findById(product.bicycleId);
//     if (!bicycle) throw new Error("Bicycle not found");

//     if (product.quantity > bicycle.stock) {
//       throw new Error(`Only ${bicycle.stock} units available for ${bicycle.name}`);
//     }

//     totalPrice += bicycle.price * product.quantity;
//   }

//   // Create new order
//   const order = new OrderModel({
//     userId,
//     products,
//     totalPrice,
//     status: "pending",
//   });

//   await order.save();
//   return order;
// };

// export const orderServices={
//     createOrder
// }