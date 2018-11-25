const Dogs = require('../../models/Dog');
const Breed = require('../../models/Breed');
//Get all dogs
const getDogs = (req, res) => {
    Dogs.find({

    }).exec((err, dog) => {
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
    Dogs.find({
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
    Dogs.find({
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
    Dogs.findById({
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
    Dogs.deleteOne({
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
const createDog = (req, res) => {
    const dogData = req.body;
    Dogs.create({
        name: dogData.name,
        birthDate: dogData.birthDate,
        breed: dogData.breed,
        dadBreed: dogData.dadBreed,
        momBreed: dogData.momBreed,
        shopId: dogData.shopId,
        selledDate: dogData.selledDate,
        description: dogData.description,
        pictures: dogData.pictures,
        size: dogData.size,
        weight: dogData.weight,
        primaryColor: dogData.primaryColor,
        secondaryColor: dogData.secondaryColor,
        type: dogData.type,
        certificateId: dogData.certificateId,
        sellPrice: dogData.sellPrice,
        rentPrice: dogData.rentPrice,
        rentStatus: dogData.rentStatus
    }, (err) => {
        if (err) {
            res.json({
                msg: 'Failed to create new dog'
            });
        } else {
            res.status(200).json({
                msg: "Add " + dogData.name + " sucessful",
                id: dogData.id
            });
        }
    })
}

const updateDog = (req, res) => {
    //const id = req.params.id;
    const dogData = req.body;
    Dogs.findByIdAndUpdate(req.params.id, dogData, (err) => {
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
    Dogs.update({
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
        console.log(dog);
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