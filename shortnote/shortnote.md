*req.locals vs res.locals*

Both res.locals and req.locals are objects that can be used to store data and pass it between middleware functions and route handlers in an Express application.

res.locals is an object that contains response local variables scoped to the request. This means that res.locals is available only to the view templates rendered for that specific request/response cycle. It's commonly used to pass data from middleware to route handlers and ultimately to the view templates.

 db.getDb().collection('users').findOne({_id: new mongodb.ObjectId(userId)},{projection:{password:0}}); //exclude password from get data from DB  *need to define projection with nested object*


