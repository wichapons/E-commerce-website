const db = require('../database/database');
const mongodb = require('mongodb');

class Product{
    constructor(productData){
        //Product details
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = parseFloat(productData.price); //convert to number
        this.description = productData.description;
        //Product images
        this.imageName = productData.imageName;
        this.updateImagePathAndUrl();
        if(productData._id){
            this.id = productData._id.toString();
        }   
        
    }

    async save(){
        //save product data to database
        let productDetails = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            imageName: this.imageName
        }

        //if has an ID this means user is trying to update the product details
        if(this.id){
            //check if user upload new image or not 
            if(!this.imageName){
                console.log('image not found, deleting productDetails.image ');
                delete productDetails.imageName;  //if not delete the productDetails.image key-value pair to prevent undefine value
            }
            console.log('after delete productDetails.image');
            console.log(Object.entries(productDetails));
            await db.getDb().collection('products').updateOne({_id:new mongodb.ObjectId(this.id)},{$set:productDetails});
        } else{
            await db.getDb().collection('products').insertOne(productDetails);
        }

    }

    static async findAll(){
        const allProducts = await db.getDb().collection('products').find().toArray();
        console.log('at findAll stage: ');
        console.log(Object.values(allProducts));

        return allProducts.map((productDoc)=>{
            return new Product(productDoc);
        });
    }

    static async findUserID(productID){

        //check productID isValid
        let productData;
        try{
            const productId = new mongodb.ObjectId(productID);
            productData = await db.getDb().collection('products').findOne({_id:productId});
        } catch(err){
            throw new Error('productID is not invalid cannot convert to objectID in mongoDB:'+err)
        }
        
        //check productData is found or not
        if(!productData){
            const error = new Error('ProductID not found on the database');
            throw error;
        }
        return new Product(productData);
    }

    async updateImage(newImage){
        this.imageName = newImage;
        this.updateImagePathAndUrl();
    }

    async updateImagePathAndUrl(){
        this.imagePath = `/product-data/image/${this.imageName}`; //path for save the file
        this.imageUrl = `/products/image/${this.imageName}`; //URL for frontend preventing user to see all of the file image folder
    }

    async removeProduct(){
        const productId = new mongodb.ObjectId(this.id);
        return await db.getDb().collection('products').deleteOne({_id:productId});
    }

}


module.exports=Product