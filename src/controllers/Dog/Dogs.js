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
const getDogId = (req, res) => {
    Dog.findById({
        _id: req.params.id
    }).exec((err, dog) => {
        if (err) {
            res.status(404).send();
            return;
        }
        if (dog) {
            res.status(200).json(dog);
            console.log("getDogsID");
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

const getBreed = (req,res) => {
    Breed.find.exec((err, breed) => {
        if(err) {
            res.status(404).send();
            return;
        } else {
            res.status(200).json(breed);
        }
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
    addBreed: addBreed,
    getBreed: getBreed
}