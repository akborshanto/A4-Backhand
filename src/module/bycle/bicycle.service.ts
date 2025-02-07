import { IBicycle } from "./bicycle.interface";
import BicycleModel from "./bicycle.model";


 const createBicycle = async (data: IBicycle) => {
  return await BicycleModel.create(data);
};

 const getAllBicycles = async () => {
  return await BicycleModel.find();
};

//get single bicycle
const getSingleBicycle = async (id: string) => {
    //   const result = await User.findOne({name:"habi jabi"})
    const result = await BicycleModel.findById(id)
    return result
  }
  export const updateBicycle = async (id: string, updateData: any) => {
    return await BicycleModel.findByIdAndUpdate(id, updateData, { new: true });
  };

 const deleteBicycle = async (id: string) => {
    console.log(id)
  return await BicycleModel.findByIdAndDelete(id);
};
export const BicycleServices={
    createBicycle,
    getAllBicycles,
    updateBicycle,
    getSingleBicycle,
    deleteBicycle
}