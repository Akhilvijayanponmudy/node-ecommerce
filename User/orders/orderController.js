const OrderModel = require('../../models/ordersModel');
const Product = require('../../models/productModel');

const ordersList = async (req, res) => {

    if (!req.user.userId) {
        return res.status(500).json({ message: 'user id not retreved through jwd' });
    }
    const userId = req.user.userId;
    try {
        const orders = await OrderModel.find({ userId: userId, 'items.shippingStatus': 'Orderd' });
        const ordersArr = orders[0].items;
        console.log(ordersArr);
        const ordersFinalArr = [];

        const productPromises = ordersArr.map(async (order) => {
            const productID = order.productId.toString();
            try {
                const productArr = await Product.findById(productID);
                return {
                    productName: productArr.productName,
                    productActualPrice: productArr.productActualPrice,
                    paymentMethod: order.paymentMethod,
                    shippingAddress: order.shippingAddress,
                    orderdDate: order.date
                };
            } catch (error) {
                console.error(`Error fetching product data for order item ${productID}:`, error);
                return null;
            }
        });
        const resolvedProducts = await Promise.all(productPromises);
        ordersFinalArr.push(...resolvedProducts.filter(productData => productData))
        res.json({ 'status': true, 'message': "done", 'ordersArr': ordersFinalArr });

    } catch (error) {
        console.log(error);
    }
}
module.exports = { ordersList }