const multer = require('multer');
const uuid = require('uuid').v4; //for generating unique ID

const upload = multer({
    //set path to save file
    storage: multer.diskStorage({
        destination:'product-data/image',
        filename: (req,file,callback)=>{
            callback(null, uuid()+'-'+file.originalname)
        }
    })
});

const multerConfig =  upload.single('productImage') // find the field named "productImage" in the submitted form

module.exports = multerConfig;
