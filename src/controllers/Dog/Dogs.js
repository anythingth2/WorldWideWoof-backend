const {
    Dog,
    Breed,
    Shop,
    User
} = require('../../models')
//Get all dogs
const getDogs = (req, res) => {

    var filter = req.query;

    Dog.find(filter).exec((err, dog) => {
        if (err) {
            res.status(404).send();
            return;
        } else {
            res.status(200).json(dog);
            console.log("getDogs")
        }
    });
};
//Find all Dogs that for Sale
const getDogsFS = (req, res) => {
    Dog.find({
        type: 1 //type 1 = forSale
    }).exec((err, dog) => {
        if (err) {
            res.status(404).send();
            return;
        } else {
            res.status(200).json(dog);
            console.log("getDogsFS")
        }
    });
};
//Find all dogs that for Adopt
const getDogsFA = (req, res) => {
    Dog.find({
        type: 2 //type 2 = forAdopt
    }).exec((err, dog) => {
        if (err) {
            res.status(404).send();
            return;
        } else {
            res.status(200).json(dog);
            console.log("getDogsFA")
        }
    });
};
//Find dog by id
const getDogId = async (req, res) => {
    Dog.findById({
        _id: req.params.id
    }).exec(async (err, dog) => {
        if (err) {
            res.status(404).send();
            return;
        }
        if (dog) {
            // dog{
            //     name: String,
            //      age: String,
            //      breed: String,
            //      dadBreed: String,
            //      momBreed: String,
            //      shopName: String,
            //      phoneNumber: Number,
            //      description: String,
            //      pictures: [String],
            //      size: Number,
            //      weight: Number,
            //      primaryColor: Number,
            //      type: Number,
            //      price: String,
            //      rentStatus: String
            //     }
            //     similarDog:[{
            //      name:String,
            //      breed:String,
            //      age:String,
            //      price:Number
            //     }]


            dog.age = Math.ceil((new Date() - dog.birthDate) / (1000 * 60 * 60 * 24));
            dog.age = '' + Math.floor(dog.age / 365) + ' ปี ' + Math.floor((dog.age % 365) / 12) + ' เดือน';
            dog.breed = 'testBreed';
            dog.dadBreed = 'testBreed';
            dog.momBreed = 'testBreed';
            dog.shopName = dog.shop.name;
            dog.pictures = ['https://www.akc.org/wp-content/themes/akc/component-library/assets//img/welcome.jpg',
                'https://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/558828-istock-865223918.jpg',
                'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13001815/Alaskan-Malamute-On-White-03-400x267.jpg'
            ]
            delete dog.shop;
            dog.phoneNumber = dog.shop.tel;
            dog.size = 'ใหญ่';
            dog.price = dog.sellPrice;

            var similarDog = await Dog.find().limit(3).exec();
            res.render('html/dogInfo',{dog:dog,similarDog:similarDog} )
        } else {
            res.status(404).send();
            console.log("else")
        }

    });
};
//Delete one dog
const deleteDog = (req, res) => {
    Dog.deleteOne({
        id: req.params.id
    }, (err) => {
        if (err) {
            res.status(404).send()
        } else {
            res.status(200).json({
                msg: "Delete complete"
            });
            console.log(req.body.name + " have been delete");
        }
    })
}
//Create Dog
const createDog = async (req, res) => {
    const user = req.session.user;
    const dogData = req.body;
    var shop = await Shop.findById(user.shop._id);
    Dog.create({
        name: dogData.name,
        birthDate: new Date(dogData.birthDate),
        description: dogData.description,
        weight: dogData.weight,
        sellPrice: dogData.sellPrice,
        shop: shop
    }, (err, dog) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                msg: 'Failed to create new dog'
            });
        } else {
            res.status(200).json({
                msg: "Add " + dogData.name + " sucessful",
            });
        }
    })
}

const updateDog = (req, res) => {
    const dogData = req.body;
    Dog.findByIdAndUpdate(req.params.id, dogData, (err) => {
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

const uploadDogImage = (req, res, next) => {
    Dog.update({
        _id: req.params.id
    }, {
        $push: {
            pictures: '/image/' + req.file.filename
        }
    }).then((dog) => {
        if (dog == null) {
            res.status(404).json({
                msg: 'wrong dog id'
            });
        }
        res.status(200).json({});
    });
};

const addBreed = (req, res) => {
    const data = req.body;
    Breed.create({
        title: data.title
    }).then((breed) => {
        res.status(201).json(breed);
    });
};
module.exports = {
    getDogs: getDogs,
    createDog: createDog,
    getDogsFA: getDogsFA,
    getDogsFS: getDogsFS,
    deleteDog: deleteDog,
    getDogId: getDogId,
    updateDog: updateDog,
    uploadDogImage: uploadDogImage,
    addBreed: addBreed
}