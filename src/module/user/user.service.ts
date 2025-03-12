import { IUser } from './user.interface'
import User from './user.model'

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload)

  return result
}

const getUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  //   const result = await User.findOne({name:"habi jabi"})
  const result = await User.findById(id)
  return result
}
//get email
const updateUser = async (id: string, data: IUser) => {
  
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  })
//if name will be come 
// get age by userId
//add a value key or




  return result
}
// Service function to fetch a user by email
const getSingleEmail = async (email: string) => {

  return await User.findOne( {email: email} ); // Convert email to lowercase
};

//
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const userService = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getSingleEmail
}