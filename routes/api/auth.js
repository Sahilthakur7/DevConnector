const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//@route GET api/auth
//@desc test route
//@access public
router.get('/',auth,async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

//@route POST api/auth
//@desc authenticate user and get token
//@access public
router.post('/',[
    check('email', 'Add a proper email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req,res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {email,password} = req.body;

        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({errors : [{message: 'Invalid credentials'}]});
            }

            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({errors: [{message: 'Invalid credentials'}]});
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,config.get('jwtSecret'),
                {expiresIn: 3600} , (err,token) => {
                    if(err){
                        throw err;
                    }else{
                        res.json({token});
                    }
                });

        }catch(err){
            res.status(500);
        }

    });




module.exports = router;
