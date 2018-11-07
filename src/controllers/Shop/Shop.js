const Shop = require('../../models/Shop');

const getShopinfo = (req, res) => {
    Shop.findById({
        _id: req.params.id
    }).exec((err, shop) => {
        if(err) {
            res.status(404).send();
            return;
        }
        if(shop) {
            res.status(200).json(shop);
        }
        else {
            res.status(404).send();
        }
    })
};

const updateShop = (req, res) => {
    const shopData = req.body;
    Shop.findByIdAndUpdate(req.params.id, shopData, (err) => {
        if (err) {
            res.status(403)
        } else {
            res.status('200').json({
                msg: "Edit success",
                id: req.body.id
            });
        }
    })

}

const addShop = (req, res) => {
    const shopData = req.body;
    Shop.create({
    address: shopData.address,
    province: shopData.province,
    zipcode: shopData.zipcode,
    tel: shopData.tel,
    license: shopData.license,
    lat: shopData.lat,
    lng: shopData.lng,
    description: shopData.description,
    openTime: shopData.openTime,
    closeTime: shopData.closeTime
    },(err) => {
        if (err) {
            res.status(400).json({
                msg: 'Failed to add a new Shop'
            })
        }
    })
}
module.exports = {
    getShopinfo: getShopinfo,
    updateShop: updateShop,
    addShop: addShop
};