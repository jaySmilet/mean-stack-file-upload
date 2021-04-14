const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid file type');
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } })

// POST User
router.post('/create', uploadOptions.single('avatar'), (req, res, next) => {
    const file = req.file;
    if (!file) return res.status(400).send("No image selected in the request");
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const userData = new userModel({
        name: req.body.name,
        avatar: `${basePath}${fileName}` // 'http://localhost:3000/public/uploads/img-125
    });
    userData.save()
        .then(result => {
            res.status(201).json({ message: "User Created Successfully", userCreated: result })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", err: err })
        })
})

// GET All User
router.get('/', (req, res) => {
    userModel.find({}).select(' -__v').exec()
        .then(result => {
            res.status(200).json({ message: "Users retrieved successfully!", userData: result })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

// GET All User Count
router.get('/count', (req, res) => {
    userModel.countDocuments((count) => count)
        .then(userCount => {
            if (!userCount) {
                return res.status(403).json({ message: "No record found" });
            }
            res.status(200).json({ message: "all user data fetched", userCount: userCount })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

// GET User
router.get('/:userId', (req, res) => {
    userModel.find({ _id: req.params.userId }).exec()
        .then(result => {
            res.status(200).json({ message: "user data fetched", userdata: result })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;