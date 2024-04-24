const User = require('../../models/userModel')
const Dashboard = async (req, res) => {
    try {
        usersCount = await User.countDocuments();

    } catch (error) {
        console.log(error);
    }
    res.render('admin/dashboard/dashboard');
}
module.exports = {
    Dashboard,
};
