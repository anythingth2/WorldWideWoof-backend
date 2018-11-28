const Shop = require('../../models/Shop');

const getShopInfo = (req, res) => {
    Shop.find({
        _id: req.params._id

    }).exec((err, shop) => {
        if(err) {
            res.status(404).send();
            return;
        }
        else{
            res.status(200).json(shop);
        }
    });
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

const getShopList = (req, res) => {
    Shop.find({

    }).exec((err, shop) => {
        if(err) {
            res.status(404).send();
            return;
        }
        else{
            res.status(200).json(shop);
        }
    });
};

module.exports = {
    getShopInfo: getShopInfo,
    getShopList: getShopList,
    updateShop: updateShop
}