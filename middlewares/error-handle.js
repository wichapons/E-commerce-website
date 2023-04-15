function handleErrors(err,req,res,next){
    if (err === 404){
        res.status(404);
        res.render('shared/404');
        console.log(err);
        return;
    }else{
        res.status(500);
        res.render('shared/500');
        console.log(err);
        return;
    }
    
}

module.exports = handleErrors;