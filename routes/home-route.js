const express = require('express');  //make express available in this fil

const router = express.Router();


router.get('/',(req,res)=>{
    res.redirect('/products')
});

module.exports = router;