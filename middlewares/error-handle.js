function handleErrors(err,req,res,next){
    console.log(err);
    res.status(500);
    res.render('shared/500');
}

module.exports = handleErrors;