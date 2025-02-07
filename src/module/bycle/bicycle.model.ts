import { model, Schema } from 'mongoose';
import { IBicycle } from './bicycle.interface';
const BicycleSchema: Schema = new Schema({

    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    model: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 }
  }, { timestamps: true });
  

  const BicycleModel = model<IBicycle>("Bicycle", BicycleSchema);
  export default BicycleModel;
  