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
const blankImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

const getDogsLanding = async (req, res) => {
    var dogsForSale = await Dog.find({

    }).sort({
        _id: 'desc'
    }).limit(3).populate('breed', 'title').lean().exec();



    var mapCallback = (dog) => {
        dog.picture = dog.pictures[0] || blankImage;
        dog.breed = dog.breed ? dog.breed.title : '-';
        dog.gender = dog.gender == 0 ? 'ตัวผู้' : 'ตัวเมีย';
        var diffSec = new Date() - dog.birthDate;
        var daySec = 24 * 60 * 60 * 1000;

        dog.year = Math.floor(diffSec / (daySec * 30 * 12)) || '-';
        dog.month = Math.floor(diffSec / (daySec * 30)) % 12 || '-';
        return dog;
    };
    res.render('html/landingPage', {
        dogsForSale: dogsForSale.map(mapCallback)
    });

};
const getDogsForSale = (req, res) => {

    var filter = req.query;

    Dog.find(filter).sort({
            _id: 'desc'
        })
        .populate('breed', 'title')
        .populate('momBreed', 'title')
        .populate('dadBreed', 'title')
        .populate('shop', 'name')
        .lean()
        .exec((err, dogs) => {
            if (err) {
                res.status(404).send();
                return;
            } else {
                var convertDog = (dog) => {
                    dog.age = Math.ceil((new Date() - dog.birthDate) / (1000 * 60 * 60 * 24));
                    dog.age = '' + Math.floor(dog.age / 365) + ' ปี ' + Math.floor((dog.age % 365) / 12) + ' เดือน';
                    dog.breed = dog.breed ? dog.breed.title : '-';
                    dog.gender = dog.gender == 0 ? 'ตัวผู้' : 'ตัวเมีย';
                    dog.dadBreed = dog.dadBreed ? dog.dadBreed.title : '-';
                    dog.momBreed = dog.momBreed ? dog.momBreed.title : '-';
                    // for (var i = 0; i < 3; i++) {
                    //     dog.pictures[i] = dog.pictures[i] || blankImage;
                    // }
                    dog.picture = dog.pictures ? dog.pictures[0] || blankImage :  blankImage;
                    dog.primaryColor = dog.primaryColor || '-';
                    // dog.shopName = dog.shop.name;
                    // dog.phoneNumber = dog.shop.tel;
                    dog.size = 'ใหญ่';
                    dog.price = dog.sellPrice;
                    return dog;
                }
                dogs = dogs.map((dog)=>convertDog(dog));
                console.log(dogs);
                res.status(200).render('html/forSale', {
                    dogs: dogs
                });
            }
        });

};
// //Find all Dogs that for Sale

//Find dog by id
const getDogId = async (req, res) => {

    Dog.findById({
            _id: req.params.id
        }).populate('breed', 'title')
        .populate('momBreed', 'title')
        .populate('dadBreed', 'title')
        .populate('shop', 'name')
        .lean().exec(async (err, dog) => {
            if (err) {
                res.status(404).send();
                return;
            }
            if (dog) {
                
                dog = convertDog(dog);

                var count = await Dog.count();


                var similarDogs = await Dog
                    .find()
                    // .skip()
                    .limit(3)
                    .populate('breed', 'title')
                    .populate('momBreed', 'title')
                    .populate('dadBreed', 'title')
                    .populate('shop', 'name')
                    .lean()
                    .exec();


                var url = config.url;
                similarDogs = similarDogs.map(convertDog);
                console.log(similarDogs);
                res.render('html/dogInfo', {
                    dog: dog,
                    similarDogs: similarDogs
                })
            } else {
                res.status(404).send();
                console.log("else");
            }
        });
};
//View Dog Shop
const getDogShop = (req, res) => {
    const user = req.session.user;
    Dog.find({
            shop: user.shop
        }).sort({
            _id: 'desc'
        })
        .select('breed birthDate name pictures sellPrice')
        .populate('breed', 'title')
        .lean()
        .exec((err, dogs) => {
            if (err) {
                res.status(404).send();
                return;
            } else {
                // console.log(dogs)
                res.status(200).json(dogs.map((dog) => {
                    dog.pictures[0] = dog.pictures[0] || blankImage;
                    if (dog.breed)
                        dog.breed = dog.breed.title;
                    else dog.breed = '-';
                    var diffSec = new Date() - dog.birthDate;
                    var daySec = 24 * 60 * 60 * 1000;

                    dog.year = Math.floor(diffSec / (daySec * 30 * 12)) || '-';
                    dog.month = Math.floor(diffSec / (daySec * 30)) % 12 || '-';
                    console.log(dog);
                    return dog;
                }));

            }
            // res.render('html/dogList',{dogs:dogs});

        });
};
//Delete one dog
const deleteDog = (req, res) => {
    const user = req.session.user;
    Dog.deleteOne({
        _id: req.params.id,
        // shop: user.shop._id
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
    const user = await req.session.user;
    var shop = await Shop.findById(user.shop);
    const dogData = await req.body;
    var diffSec = new Date() - ((Number(dogData.year) * 12 + Number(dogData.month)) * 30 * 24 * 60 * 60 * 1000);
    var birthDate = new Date(diffSec);

    var data = {
        name: dogData.name,
        birthDate: birthDate,
        description: dogData.description || '-',
        weight: Number(dogData.weight),
        size: dogData.size,
        gender: Number(dogData.gender),
        breed: await Breed.findOne({
            title: dogData.breed,
        }),
        momBreed: await Breed.findOne({
            title: dogData.momBreed
        }),
        dadBreed: await Breed.findOne({
            title: dogData.dadBreed
        }),
        sellPrice: Number(dogData.sellPrice),
        primaryColor: dogData.primaryColor,
        shop: shop,
    };
    console.log(data)
    Dog.create(data, (err, dog) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                msg: 'Failed to create new dog'
            });
        } else {
            res.status(200).json({
                id: dog._id
            });
        }
    })
}
const fillDogInfo = async (req, res) => {
    const dogId = await req.params.id;

    Dog.findById(dogId)
        .populate('breed', 'title')
        .populate('momBreed', 'title')
        .populate('dadBreed', 'title')
        .lean()
        .exec()
        .then((dog) => {
            if (dog != null) {

                dog.breed = dog.breed ? dog.breed.title : '-';
                dog.dadBreed = dog.dadBreed ? dog.dadBreed.title : '-';
                dog.momBreed = dog.momBreed ? dog.momBreed.title : '-';
                var diffSec = new Date() - dog.birthDate;
                var daySec = 24 * 60 * 60 * 1000;

                dog.year = Math.floor(diffSec / (daySec * 30 * 12)) || '-';
                dog.month = Math.floor(diffSec / (daySec * 30)) % 12 || '-';
                switch (dog.size) {
                    case 'เล็ก':
                        dog.size = 0;
                        break;
                    case 'กลาง':
                        dog.size = 1;
                        break;
                    case 'ใหญ่':
                        dog.size = 2;
                        break;
                }
                console.log(dog);
                res.render('html/editDog', {
                    dog: dog
                });
            } else {
                res.status(404).json({
                    msg: "dog not found"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                msg: "dog error"
            });
        });

};


const updateDog = (req, res) => {
    const dog = req.body;
    dog.size = ['เล็ก', 'กลาง', 'ใหญ่'][Number(dog.size)];
    dog.weight = Number(dog.weight);
    dog.gender = Number(dog.gender);

    var diffSec = new Date() - ((Number(dog.year) * 12 + Number(dog.month)) * 30 * 24 * 60 * 60 * 1000);
    dog.birthDate = new Date(diffSec);
    dog.sellPrice = Number(dog.sellPrice);

    Dog.findByIdAndUpdate(req.params.id, dog, (err) => {
        if (err) {
            res.status(403);
        } else {
            res.status(200).json({
                // id: req.body.id
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
    let newFileName = `${file.originalname ||'untitled'}_${Date.now()}`;

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


const getBreed = (req, res) => {
    console.log('Breed')
    Breed.find({

    }).lean().exec((err, breeds) => {
        if (err) {
            res.status(500).send();
            console.log("error")
            return;
        } else {
            breeds = breeds.map(breed => breed.title);
            res.status(200).json(breeds);
            console.log("breeddddd")
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
        res.status(200).json({});

    }).catch((err) => console.log(err));
};
module.exports = {
    getDogsLanding: getDogsLanding,
    getDogsForSale: getDogsForSale,
    createDog: createDog,
    // getDogsFA: getDogsFA,
    // getDogsFS: getDogsFS,
    deleteDog: deleteDog,
    getDogId: getDogId,
    fillDogInfo: fillDogInfo,
    updateDog: updateDog,
    uploadDogImage: uploadDogImage,
    addBreed: addBreed,
    imageParser: imageParser,
    mockDog: mockDog,
    getBreed: getBreed,
    getDogShop: getDogShop,
}