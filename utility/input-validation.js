

function isEmpty(input){
    if (input.trim()==='' || !input){
        return false;
    }else{
        return true;
    }
}

function isInputValid(email,password,name,street,postal,city){
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
            console.log('isInputValid=true');
            return true;
    }else{
        console.log('isInputValid=false');
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