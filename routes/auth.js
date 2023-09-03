const router = require('express').Router();
const {User} = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');




router.post('/', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send({message:error.details[0].message});

        const user = await User.findOne({username:req.body.username});
        if(!user) return res.status(401).send({message:'Invalid username'});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(401).send({message:'Invalid password.'});

        const token = user.generateAuthToken();
        const username = user.username;
        const userType = user.usertype;
        //console.log(token);
        res.status(200).send({username:username,userType:userType,token:token,message:'Login successful.'});
        console.log("POST /api/auth");
    }catch(err){
        res.status(500).send({message:err.message || 'Something went wrong.'});
    }
});

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

module.exports = router;