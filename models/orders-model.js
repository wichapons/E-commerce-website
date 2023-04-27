const db = require('../database/database');
const mongodb = require('mongodb');


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
          const orderId = new mongodb.ObjectId(this.id); //convert order id to mongoDB format
          return db.getDb().collection('orders').updateOne({ _id: orderId }, { $set: { status: this.status } }); //update status
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
    //create 1 order
    static transformOrderDocument(orderDoc) {
        return new Order(
          orderDoc.productData,
          orderDoc.userData,
          orderDoc.status,
          orderDoc.date,
          orderDoc._id
        );
      }
      
      //create all order in db 
      static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);
      }
    
      //find all orders
      static async findAll() {
        const orders = await db
          .getDb()
          .collection('orders')
          .find()
          .sort({ _id: -1 })
          .toArray();
    
        return this.transformOrderDocuments(orders); //return all orders in db
      }
      
      //find all orders from that user
      static async findAllOrderForUser(userId) {
        console.log('userID in findAllOrderForUser= '+userId);
        const uid =  new mongodb.ObjectId(userId);
        console.log('uid in findAllOrderForUser = '+userId);
        const orders = await db
          .getDb()
          .collection('orders')
          .find({ 'userData._id': uid }) //check userID in DB
          .sort({ _id: -1 }) //sort id in DB desending order
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }

      //find by orderID
      static async findById(orderId) {
        const order = await db
          .getDb()
          .collection('orders')
          .findOne({ _id: new mongodb.ObjectId(orderId) });
    
        return this.transformOrderDocument(order);
      }

      





    }


module.exports = Order;