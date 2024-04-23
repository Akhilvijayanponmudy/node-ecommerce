const OrderModel = require('../../models/ordersModel');
const Product = require('../../models/productModel');

const ordersList = async (req, res) => {

    if (!req.user.userId) {
        return res.status(500).json({ message: 'user id not retreved through jwd' });
    }
    const userId = req.user.userId;
    if (userId) {

        try {
            const orders = await OrderModel.find({ userId: userId, 'items.shippingStatus': 'Orderd' });
            const ordersArr = orders[0].items;
            const ordersFinalArr = [];
            const productPromises = ordersArr.map(async (order) => {
                const productID = order.productId.toString();
                const objectIdString = order._id.toString();

                try {
                    const productArr = await Product.findById(productID);
                    return {
                        orderID: objectIdString,
                        productName: productArr.productName,
                        productActualPrice: productArr.productActualPrice,
                        productImage: productArr.primaryImage,
                        paymentMethod: order.paymentMethod,
                        shippingAddress: order.shippingAddress,
                        orderdDate: order.date,
                        orderQuandity: order.productQandity
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
    } else {
        res.json({ 'status': false, 'message': "user not fount" });
    }
}

const orderCancel = async (req, res) => {
    const userId = req.user.userId;
    const orderId = req.params.id;

    try {
        const updatedOrder = await OrderModel.findOneAndUpdate(
          { userId: userId },
          { $pull: { 'items': { _id: orderId } } },
          { new: true }
        );
        
        if (updatedOrder) {
          console.log("Item removed successfully:");
        } else {
          console.log("No orders found for the user ID.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    res.json({ 'status': true, 'message': "done" });

}

module.exports = { ordersList, orderCancel }