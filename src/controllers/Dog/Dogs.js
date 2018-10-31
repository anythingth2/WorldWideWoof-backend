const Dogs = require('../../models/Dog')

//Get all dogs
const getDogs = (req,res) => {
    Dogs.find({

    }).exec((err, dog) => {
        if(err) {
            res.status(404).send();
            return;
        }
        else {
            res.status(200).json(dog);
        }
    });
};
//Find all Dogs that for Sale
const getDogsFS = (req,res) => {
    Dogs.find({
        type: '1' //type 1 = forSale
    }).exec((err, dog) => {
        if(err) {
            res.status(404).send();
            return;
        }
        else {
            res.status(200).json(dog);
        }
    });
};
//Find all dogs that for Adopt
const getDogsFA = (req,res) => {
    Dogs.find({
        type: '2' //type 2 = forAdopt
    }).exec((err, dog) => {
        if(err) {
            res.status(404).send();
            return;
        }
        else {
            res.status(200).json(dog);
        }
    });
};
//Find dog by id
const getDogId = (req,res) => {
    Dogs.findOne({
        id: req.params.id
    }).exec((err, dog) => {
        if(err) {
            res.status(404).send();
            return;
        }
        else {
            res.status(200).json(dog);
        }
    });
};
//Delete one dog
const deleteDog = (req,res) => {
    Dogs.deleteOne({
        id: req.params.id
    }, function (err){
        if (err) {
            res.status(404)
        }
        else {
            console.log(req.body.name + " have been delete")
        }
    })

}
//Create Dog
const createDog = (req,res) => {
    const dogData = req.body;
    Dogs.create({
        name: dogData.name,
        birthDate: dogData.birthDate,
        breed: dogData.breed,
        dataBreed: dogData.dataBreed,
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
    },function(err){
        if(err){
            res.json({
                msg: 'Failed to create new dog'
            });
        }
        else{
            res.status('200').json({
                msg: "Add " + dogData.name + " sucessful",
                id: dogData.id
            });
        }
    })
}



module.exports = {
    getDogs:   getDogs,
    createDog: createDog,
    getDogsFA: getDogsFA,
    getDogsFS: getDogsFS,
    deleteDog: deleteDog,
    getDogId:  getDogId
}
