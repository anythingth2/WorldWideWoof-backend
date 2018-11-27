const {
    Dog,
    Breed,
    Shop,
    User
} = require('../../models');
const {
    config
} = require('./../../util');
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
const admin = require('firebase-admin');
const serviceAccount = require('../../../worldwidewoof-bcdfa-firebase-adminsdk-ylhyc-7b4cabfdfe.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.firebase.bucket
})
const bucket = admin.storage().bucket();
const faker = require('faker');
const getDogs = (req, res) => {

    var filter = req.query;

    Dog.find(filter)
        .populate('breed','title')
        .populate('momBreed','title')
        .populate('dadBreed','title')
        .populate('shop','name')
        .lean()
        .exec((err, dogs) => {
            if (err) {
                res.status(404).send();
                return;
            } else {
                res.status(200).json(dogs);
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

            var similarDogs = await Dog.find().limit(3).exec();
            var url = config.url;
            similarDogs.map(similarDog => similarDog.url = url + '/api/dog/' + similarDog._id);
            res.render('html/dogInfo', {
                dog: dog,
                similarDog: similarDogs
            })
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
const imageParser = (req, res, next) => {
    const busboy = new Busboy({
        headers: req.headers,
    })

    var fileBuffer = new Buffer('')

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        file.on('data', data => {
            fileBuffer = Buffer.concat([fileBuffer, data])
        })

        file.on('end', () => {
            const file_object = {
                fieldname,
                originalname: filename,
                encoding,
                mimetype,
                buffer: fileBuffer,
            }

            req.file = file_object

        })
    })

    req.data = {}

    busboy.on('field', function (
        fieldname,
        val
    ) {
        req.data[fieldname] = val
    })

    busboy.on('finish', function () {
        console.log('Done parsing form!')

        next()
    })

    busboy.end(req.rawBody)
}


const uploadDogImage = (req, res, next) => {
    var file = req.file;
    if (!file) {
        res.status(400).json({
            msg: 'No image file'
        });
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    blobStream.on('error', (error) => {
        res.status(500).json({
            msg: 'Something is wrong! Unable to upload at the moment.'
        });
    });

    blobStream.on('finish', () => {
        fileUpload.getSignedUrl({
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60 * 365
        }).then((url) => {
            Dog.update({
                _id: req.params.id
            }, {
                $push: {
                    pictures: url
                }
            }).then((dog) => {
                if (dog == null) {
                    res.status(404).json({
                        msg: 'wrong dog id'
                    });
                }
                res.status(200).json({});
            });

        });

    })
    blobStream.end(file.buffer);
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

const mockDog = async (req, res, next) => {
    var shopId = req.query.shopId;
    console.log(shopId)
    const countBreed = await Breed.count();

    Dog.create({
        name: faker.name.firstName(),
        birthDate: faker.date.past(10),
        breed: await Breed.findOne().skip(Math.floor(Math.random() * countBreed)).exec(),
        dadBreed: await Breed.findOne().skip(Math.floor(Math.random() * countBreed)).exec(),
        momBreed: await Breed.findOne().skip(Math.floor(Math.random() * countBreed)).exec(),
        shop: shopId,
        gender: Math.floor(Math.random() * 2),
        description: faker.lorem.paragraph(),
        size: ["เล็ก", "กลาง", "ใหญ่"][Math.floor(Math.random() * 3)],
        weight: Math.floor(Math.random() * 10),
    }).then((v) => {
        res.status(200).json();

    }).catch((err) => console.log(err));

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
    imageParser: imageParser,
    mockDog: mockDog,
    getBreed: getBreed
}