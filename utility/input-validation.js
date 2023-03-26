

function isEmpty(input){
    if (input.trim()==='' || !input){
        return false;
    }else{
        return true;
    }
}

function isInputValid(email,password,name,street,postal,city){

    console.log(email,password,name,street,postal,city);

    if (email && 
        email.includes('@') && 
        password && 
        password.trim().length>=6 && 
        name && 
        isEmpty(name) &&
        isEmpty(street) &&
        isEmpty(postal) &&
        isEmpty(city)
        ){
            console.log('hi trure');
            return true;
    }else{
        console.log('hi flase');
        return false;
    }
}

function isSameConfirmEmail(email,confirmEmail){
    if(email !== confirmEmail){
        
        return false;
    }else{
        return true;
    }
}



module.exports = {
    isInputValid:isInputValid,
    isSameConfirmEmail
}