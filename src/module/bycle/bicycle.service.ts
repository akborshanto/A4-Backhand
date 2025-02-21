import { IBicycle } from "./bicycle.interface";
import BicycleModel from "./bicycle.model";


 const createBicycle = async (data: IBicycle) => {
  return await BicycleModel.create(data);
};

 const getAllBicycles = async (query: Record<string, unknown>) => {
  // 1 __convert string and number all query
  const searchTerm = query.searchTerm ? String(query.searchTerm) : "";
  const minPrice = query.minPrice ? Number(query.minPrice) : 0;
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : Number.MAX_VALUE;
  const brand = query.brand ? String(query.brand) : "";
  const model = query.model ? String(query.model) : "";

  // 2 __dynamic object
  const filter: any = {};
//using SearchTerm with name,brand,model
if(searchTerm){
  filter.$or=[
    { name: { $regex: searchTerm, $options: 'i' } },
    { brand: { $regex: searchTerm, $options: 'i' } },
    { model: { $regex: searchTerm, $options: 'i' } },
  ]
}
filter.price = { $gte: minPrice, $lte: maxPrice };
//Brand and Model Fitering
if(brand){
  filter.brand={$regex:brand,$options:'i'}
}
if (model) {
  filter.model = { $regex: model, $options: 'i' };
}
  return await BicycleModel.find(filter)

};

//get single bicycle
const getSingleBicycle = async (id: string) => {
    //   const result = await User.findOne({name:"habi jabi"})
    const result = await BicycleModel.findById(id)
    return result
  }
  export const updateBicycle = async (id: string, updateData: Partial<IBicycle>) => {
    return await BicycleModel.findByIdAndUpdate(id, updateData, { new: true });
  }

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