const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    try{
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send({message:error.details[0].message});
        
        const user = await User.findOne({ username: req.body.username });
        if (user) return res.status(400).send({message:'User already registered.'});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashedPassword }).save();
        res.status(200).send({message:'User created successfully.'});
        console.log("POST /api/users");
    }catch(err){
        res.status(500).send({message:err.message || 'Something went wrong.'});
    }
})

module.exports = router;