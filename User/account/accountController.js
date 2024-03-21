const accountView = (req, res) => {
    res.json({ 'message': 'account page' })
}
const addressView = (req, res) => {
    res.json({ 'message': 'Address page' })
}

module.exports = {
    accountView,
    addressView
}