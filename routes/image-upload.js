const express=require('express');
const router=express.Router();

const authorization=require('../middleware/authorizationMiddleware');
const upload=require('../utils/image-upload.js');

const singleUpload=upload.single('image');

router.post('/', authorization ,async (req,res) => {
    console.log('Posting image...');

    singleUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        //every image is stored in form https://the-spoon.s3.eu-central-1.amazonaws.com/{id}
        const imageId=req.file.location.split("amazonaws.com/")[1];
        return res.status(201).json({'imageId': imageId});
    });

});
module.exports=router;