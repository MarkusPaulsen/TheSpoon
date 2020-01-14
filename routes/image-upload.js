const express=require('express');
const router=express.Router();

const authorization=require('../middleware/authorizationMiddleware');
const upload=require('../utils/image-upload.js');

const singleUpload=upload.single('image');

router.post('/', authorization ,async (req,res) => {
    try {
        console.log('Posting image...');

        singleUpload(req, res, function(err) {
            if (err) {
                return res.status(422).send({errors: [{title: 'Image upload error.', detail: err.message}]});
            }
            //every image is stored in form https://the-spoon.s3.eu-central-1.amazonaws.com/{id}
            const imageID=req.file.location.split("amazonaws.com/")[1];
            return res.status(201).json({'imageID': imageID});
        });

    } catch (error) {
        res.status(500).send('Internal server error');
    }


});
module.exports=router;