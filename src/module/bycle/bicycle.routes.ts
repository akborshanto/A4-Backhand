
import { Router } from 'express'
import { BicycleController } from './bycle.controller'

const BicycleRouter = Router()

BicycleRouter.post('/create-bicycle', BicycleController.createBicycleHandler)
BicycleRouter.get('/', BicycleController.getAllBicycles)
 BicycleRouter.get('/:bicycleId',BicycleController.getSingleBicycle)
 BicycleRouter.put('/:id', BicycleController.updateBicycle)
BicycleRouter.delete('/:id', BicycleController.deleteBicycle)

export default BicycleRouter