const Dogs = require('../../models/Dog')

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
module.exports = {
    getDogs: getDogs
}

