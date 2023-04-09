const db = require('../database/database')

class Product{
    constructor(productData){
        //Product details
        this.title = productData.title,
        this.summary = productData.productSummary,
        this.price = parseFloat(productData.productPrice), //convert to number
        this.description = productData.productDescription
        //Product images
        this.imageName = productData.productImageName,
        this.productImagePath = `/product-data/image/${productData.imageName}`,
        this.imageUrl = `/products/image/${productData.imageName}`;
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
}


module.exports=Product