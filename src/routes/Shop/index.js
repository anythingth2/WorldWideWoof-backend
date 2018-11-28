const Shop = require('./../../controllers/Shop');
const {
    Router
} = require('express');
const router = Router();

router.get('/', Shop.getShopList);
router.get('/:id', Shop.getShopInfo);
router.put('/:id/update', Shop.updateShop);

module.exports = router;