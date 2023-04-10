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
        this.imagePath = `/product-data/image/${productData.imageName}`; //path for save the file
        this.imageUrl = `/products/image/${productData.imageName}`; //URL for frontend preventing user to see all of the file image folder
        if(productData._id){
            this.id = productData._id.toString();
        }   
        
    }

    async save(){
        //save product data to database

        await db.getDb().collection('products').insertOne({
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            imageName: this.imageName
        });
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
        return productData;
    }


}


module.exports=Product