const OrderModel= require('../../models/ordersModel')
const ordersList= async (req,res)=>{

    if (!req.user.userId) {
        return res.status(500).json({ message: 'user id not retreved through jwd' });
    }
    const userId = req.user.userId;

    try{
        const orders = await OrderModel.find({ 'items.shippingStatus': 'Orderd' });
        console.log(orders);
        res.json({ 'status': true, 'message': "done" ,'ordersArr':orders});

    }catch(error){
        console.log(error);

    }

}

module.exports = { ordersList }