const express = require('express');  //make express available in this fil

const router = express.Router();

router.get('/401',(req,res)=>{
    res.status(401);
    res.render('shared/401');
    return;
});

router.get('/403',(req,res)=>{
    res.status(403);
    res.render('shared/403');
    return;
});

module.exports = router;