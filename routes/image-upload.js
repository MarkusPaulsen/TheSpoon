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
        return res.status(201).json({'imageUrl': req.file.location});
    });

});
module.exports=router;