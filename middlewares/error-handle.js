function handleErrors(err,req,res,next){
    if (err === 404){
        res.status(404);
        res.render('shared/404');
        return;
    }
    res.status(500);
    res.render('shared/500');
}

module.exports = handleErrors;