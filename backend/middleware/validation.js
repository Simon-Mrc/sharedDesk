// This middleware validates inputs before they reach your routes!

function validateUser(req, res, next){
    const {name, userName, mail, password} = req.body;
    
    if(!userName || userName.trim() === ''){
        return res.status(400).json({error: 'userName is required!'});
    }
    if(userName.length > 30){
        return res.status(400).json({error: 'userName too long! max 30 characters!'});
    }
    if(userName.includes(' ')){
        return res.status(400).json({error: 'userName cannot contain spaces!'});
    }
    if(!password || password.trim() === ''){
        return res.status(400).json({error: 'password is required!'});
    }
    if(password.length < 3){
        return res.status(400).json({error: 'password too short! min 3 characters!'});
    }
    if(!mail || !mail.includes('@')){
        return res.status(400).json({error: 'invalid mail!'});
    }
    if(!name || name.trim() === ''){
        return res.status(400).json({error: 'name is required!'});
    }
    next(); // ← everything valid! go to route!
}

function validateItem(req, res, next){
    const {name, type, deskId} = req.body;

    if(!name || name.trim() === ''){
        return res.status(400).json({error: 'name is required!'});
    }
    if(name.length > 50){
        return res.status(400).json({error: 'name too long! max 50 characters!'});
    }
    if(!type || (type !== 'file' && type !== 'folder')){
        return res.status(400).json({error: 'type must be file or folder!'});
    }
    if(!deskId){
        return res.status(400).json({error: 'deskId is required!'});
    }
    next();
}

function validateDesk(req, res, next){
    const {name, ownerId} = req.body;

    if(!name || name.trim() === ''){
        return res.status(400).json({error: 'desk name is required!'});
    }
    if(name.length > 50){
        return res.status(400).json({error: 'desk name too long! max 50 characters!'});
    }
    if(!ownerId){
        return res.status(400).json({error: 'ownerId is required!'});
    }
    next();
}

module.exports = {validateUser, validateItem, validateDesk};