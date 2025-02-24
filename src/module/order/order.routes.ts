
import { Router } from 'express'
import { OrderController } from './order.controller'

const orderRouter = Router()

orderRouter.post('/create-order',OrderController.createOrder)
orderRouter.get('/all-order', OrderController.getOrders)
// orderRouter.put('/:userId', userController.updateUser)
// orderRouter.delete('/:userId', userController.deleteUser)
// orderRouter.get('/', userController.getUser)

export default orderRouter