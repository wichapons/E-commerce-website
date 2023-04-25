const db = require('../database/database')

class Order{
    constructor(cart,userData,status = 'pending',orderDate,orderId){
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(orderDate); //use built-in date constructor function
        if (this.date){
            this.formattedDate = this.date.toLocaleDateString('en-US',{
                weekday: "short",
                day:"numeric",
                month:"long",
                year:"numeric"
            })
        }
        this.id = orderId;
    }

    async save(){  //save order data to MongoDB Database
        if (this.id){ // check if already has orderID or not
            console.log('test');
        }else{ 
            const orderData = {
                userData: this.userData,
                productData:this.productData,
                date: new Date(),
                status:this.status
            };
            return (await db.getDb().collection('orders').insertOne(orderData));
        }
    }



    }


module.exports = Order;