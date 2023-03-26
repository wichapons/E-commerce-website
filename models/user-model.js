const db = require('../database/database')
const bcrypt = require('bcrypt')

class User {
    constructor(email,password,fullname,street,postal,city){
        this.email=email;
        this.password = password,
        this.name = fullname,
        this.address={
            street:street,
            postal:postal,
            city:city
        };
    }

    async getUserDataByEmail(){
       return await db.getDb().collection('users').findOne({email:this.email});
    }

    async verifyPassword(hashedPassword){
        console.log(await bcrypt.compare(this.password,hashedPassword));
        return await bcrypt.compare(this.password,hashedPassword)
    }

    async signup(){
        const  hashedPassword = await bcrypt.hash(this.password,12)  // encrypt password with saltRounds = 12
        await db.getDb().collection('users').insertOne({
        email: this.email,
        password: hashedPassword,
        name: this.name ,
        address: this.address
        });
    }
}

module.exports = User;