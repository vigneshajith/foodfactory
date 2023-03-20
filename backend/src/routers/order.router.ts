import { Router } from "express";
import asyncHandler from "express-async-handler"
import { BAD_REQ } from "../constance/http_status";
import { OrderStatus } from "../constance/order_status";
import { OrderModel } from "../models/order.model";
import auth from '../middleware/auth.mid'
const router = Router();
router.use(auth)

router.post('/create', asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
        res.status(BAD_REQ).send('Cart Is Empty!');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder)
})
)

export default router;
