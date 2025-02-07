import { model, Schema } from "mongoose";

const counterSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
});

const Counter = model("Counter", counterSchema);
export default Counter;
