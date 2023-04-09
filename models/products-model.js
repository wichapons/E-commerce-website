const db = require('../database/database')

class Product{
    constructor(productData){
        //Product details
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = parseFloat(productData.price); //convert to number
        this.description = productData.description;
        //Product images
        this.imageName = productData.imageName;
        this.imagePath = `/product-data/image/${productData.imageName}`;
        this.imageUrl = `/products/image/${productData.imageName}`;
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
}


module.exports=Product