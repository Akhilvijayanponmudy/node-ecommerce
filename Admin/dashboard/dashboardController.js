const User = require('../../models/userModel')
const Dashboard = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        if (usersCount) {
            res.render('admin/dashboard/dashboard', { usersCount: usersCount });
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    Dashboard,
};
