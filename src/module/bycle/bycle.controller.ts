import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
//create-cycle
const createBicycleHandler = async (req: Request, res: Response) => {
  try {
    const bicycle = await BicycleServices.createBicycle (req.body);
    res.status(201).json(bicycle);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
//all bicycle
const getAllBicycles = async (req: Request, res: Response) => {
    try {
      const bicycles = await BicycleServices.getAllBicycles();
      res.json(bicycles);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  //get single bicycle
  const getSingleBicycle = async (req: Request, res: Response) => {
    try {
      const bicycleId = req.params.bicycleId;
      const result = await BicycleServices.getSingleBicycle(bicycleId);
  
      
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  //update
  const updateBicycle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedBicycle = await BicycleServices.updateBicycle(id, updateData);
  

  
      res.json(updatedBicycle);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  //bicycle delete
  const deleteBicycle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const isDeleted = await BicycleServices.deleteBicycle(id);
  console.log(isDeleted)

  
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
export const BicycleController = {
   createBicycleHandler,
   getAllBicycles,
   getSingleBicycle,
   updateBicycle,
   deleteBicycle
};
